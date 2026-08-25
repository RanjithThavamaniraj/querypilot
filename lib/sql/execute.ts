import { assertSafeLearnerSql } from "@/lib/sql/guards";
import { mapPostgresError } from "@/lib/sql/errors";
import { getLabSql } from "@/lib/sql/lab-db";
import {
  SQL_EXECUTION_LIMITS,
  type SqlExecutionOutcome,
  type SqlResultSet,
} from "@/lib/sql/types";

const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function enforceRateLimit(key: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || now - bucket.windowStart > SQL_EXECUTION_LIMITS.rateLimitWindowMs) {
    rateBuckets.set(key, { count: 1, windowStart: now });
    return;
  }

  if (bucket.count >= SQL_EXECUTION_LIMITS.rateLimitMax) {
    throw new Error("Too many SQL runs. Wait a moment and try again.");
  }

  bucket.count += 1;
}

function serializeCell(value: unknown): string {
  if (value === null || value === undefined) return "NULL";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function estimatePayload(result: SqlResultSet) {
  return JSON.stringify(result.rows).length + JSON.stringify(result.columns).length;
}

export async function executeLearnerSql(
  rawSql: string,
  rateKey: string
): Promise<SqlExecutionOutcome> {
  try {
    enforceRateLimit(rateKey);
    const sqlText = assertSafeLearnerSql(rawSql);
    const sql = getLabSql();
    const started = Date.now();

    const rows = await sql.unsafe(sqlText);
    const durationMs = Date.now() - started;

    const columns =
      rows.length > 0
        ? Object.keys(rows[0] as object).map((name) => ({ name }))
        : [];

    const truncated = rows.length > SQL_EXECUTION_LIMITS.maxRows;
    const limitedRows = truncated
      ? rows.slice(0, SQL_EXECUTION_LIMITS.maxRows)
      : rows;

    const result: SqlResultSet = {
      columns,
      rows: limitedRows as Record<string, unknown>[],
      rowCount: limitedRows.length,
      truncated,
      durationMs,
    };

    if (estimatePayload(result) > SQL_EXECUTION_LIMITS.maxPayloadChars) {
      return {
        ok: false,
        postgresMessage: "Result payload too large",
        beginnerMessage: "The result is too large to display.",
        hint: "Add a WHERE clause or select fewer columns.",
      };
    }

    return { ok: true, result };
  } catch (error) {
    const postgresMessage =
      error instanceof Error ? error.message : "Unknown database error";

    // Application-side guard failures are not PostgreSQL errors.
    if (
      postgresMessage.includes("Only one SQL statement") ||
      postgresMessage.includes("not allowed in Phase 2") ||
      postgresMessage.includes("Phase 2 Module 1 only allows") ||
      postgresMessage.includes("too long") ||
      postgresMessage.includes("Enter a SQL statement") ||
      postgresMessage.includes("Too many SQL runs") ||
      postgresMessage.includes("LAB_DATABASE_URL")
    ) {
      return {
        ok: false,
        postgresMessage,
        beginnerMessage: postgresMessage,
        hint: "Use a single SELECT against the shop tables.",
      };
    }

    const mapped = mapPostgresError(postgresMessage);
    return {
      ok: false,
      postgresMessage,
      beginnerMessage: mapped.beginnerMessage,
      hint: mapped.hint,
    };
  }
}

export function normalizeResultRows(
  result: {
    columns: { name: string }[];
    rows: Record<string, unknown>[];
  },
  options: { requiresOrder: boolean; expectedColumns?: string[] }
) {
  const columnNames = options.expectedColumns?.length
    ? options.expectedColumns
    : result.columns.map((column) => column.name);

  const normalized = result.rows.map((row) =>
    columnNames.map((column) => serializeCell(row[column]))
  );

  if (!options.requiresOrder) {
    normalized.sort((a, b) => a.join("\u0000").localeCompare(b.join("\u0000")));
  }

  return {
    columns: columnNames,
    rows: normalized,
  };
}
