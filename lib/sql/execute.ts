import postgres from "postgres";

import { assertSafeLearnerSql } from "@/lib/sql/guards";
import { mapPostgresError } from "@/lib/sql/errors";
import { getLabUrl, isLabConfigured } from "@/lib/sql/lab-db";
import {
  SQL_EXECUTION_LIMITS,
  type SqlExecutionOutcome,
  type SqlResultSet,
} from "@/lib/sql/types";

const rateBuckets = new Map<string, { count: number; windowStart: number }>();

type SqlClient = ReturnType<typeof postgres>;

export type ExecuteLearnerSqlOptions = {
  inspectSQL?: string;
};

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

function isGuardFailure(message: string) {
  return (
    message.includes("Only one SQL statement") ||
    message.includes("not allowed in SQL practice") ||
    message.includes("SQL practice allows") ||
    message.includes("too long") ||
    message.includes("Too many statements") ||
    message.includes("Enter a SQL statement") ||
    message.includes("Too many SQL runs") ||
    message.includes("LAB_DATABASE_URL") ||
    message.includes("unqualified names")
  );
}

function toResultSet(
  raw: postgres.RowList<Record<string, unknown>[]>,
  durationMs: number
): SqlResultSet {
  const rows = Array.from(raw) as Record<string, unknown>[];
  const command = raw.command || undefined;
  const affected = typeof raw.count === "number" ? raw.count : rows.length;
  const isWrite = /^(INSERT|UPDATE|DELETE)$/i.test(command ?? "");

  if (isWrite && rows.length === 0) {
    return {
      columns: [{ name: "rows_affected" }],
      rows: [{ rows_affected: affected }],
      rowCount: affected,
      truncated: false,
      durationMs,
      command,
      sandboxed: true,
    };
  }

  const truncated = rows.length > SQL_EXECUTION_LIMITS.maxRows;
  const limitedRows = truncated
    ? rows.slice(0, SQL_EXECUTION_LIMITS.maxRows)
    : rows;
  const columns =
    limitedRows.length > 0
      ? Object.keys(limitedRows[0] as object).map((name) => ({ name }))
      : [];

  return {
    columns,
    rows: limitedRows,
    rowCount: isWrite ? affected : limitedRows.length,
    truncated,
    durationMs,
    command,
    sandboxed: true,
  };
}

async function setupPracticeCopy(sql: SqlClient) {
  await sql.unsafe("SET search_path TO pg_temp, shop");
  await sql.unsafe(
    "CREATE TEMP TABLE customers (LIKE shop.customers INCLUDING ALL)"
  );
  await sql.unsafe(
    "CREATE TEMP TABLE products (LIKE shop.products INCLUDING ALL)"
  );
  await sql.unsafe(`
    CREATE TEMP TABLE orders (
      id integer PRIMARY KEY,
      customer_id integer NOT NULL REFERENCES customers (id),
      product_id integer NOT NULL REFERENCES products (id),
      quantity integer NOT NULL,
      ordered_at date NOT NULL
    )
  `);
  await sql.unsafe("INSERT INTO customers SELECT * FROM shop.customers");
  await sql.unsafe("INSERT INTO products SELECT * FROM shop.products");
  await sql.unsafe("INSERT INTO orders SELECT * FROM shop.orders");
}

function createSandboxClient() {
  const labUrl = getLabUrl();
  return postgres(labUrl, {
    max: 1,
    prepare: false,
    idle_timeout: 5,
    max_lifetime: 60,
    connection: {
      application_name: "querypilot-lab-sandbox",
    },
  });
}

export async function executeLearnerSql(
  rawSql: string,
  rateKey: string,
  options: ExecuteLearnerSqlOptions = {}
): Promise<SqlExecutionOutcome> {
  let sandbox: SqlClient | undefined;

  try {
    enforceRateLimit(rateKey);
    const statements = assertSafeLearnerSql(rawSql);
    const inspectStatements = options.inspectSQL
      ? assertSafeLearnerSql(options.inspectSQL)
      : [];

    if (!isLabConfigured()) {
      throw new Error(
        "LAB_DATABASE_URL is not configured. Run scripts/lab/setup.sh and set LAB_DATABASE_URL to the querypilot_learner role."
      );
    }

    sandbox = createSandboxClient();
    const started = Date.now();
    await setupPracticeCopy(sandbox);

    let lastRaw: postgres.RowList<Record<string, unknown>[]> | undefined;
    for (const statement of statements) {
      lastRaw = (await sandbox.unsafe(statement)) as postgres.RowList<
        Record<string, unknown>[]
      >;
    }

    for (const statement of inspectStatements) {
      lastRaw = (await sandbox.unsafe(statement)) as postgres.RowList<
        Record<string, unknown>[]
      >;
    }

    const durationMs = Date.now() - started;
    const result = lastRaw
      ? toResultSet(lastRaw, durationMs)
      : {
          columns: [],
          rows: [],
          rowCount: 0,
          truncated: false,
          durationMs,
          sandboxed: true,
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

    if (isGuardFailure(postgresMessage)) {
      return {
        ok: false,
        postgresMessage,
        beginnerMessage: postgresMessage,
        hint: "Use SELECT, INSERT, UPDATE, DELETE, or a short transaction script against the shop tables.",
      };
    }

    const mapped = mapPostgresError(postgresMessage);
    return {
      ok: false,
      postgresMessage,
      beginnerMessage: mapped.beginnerMessage,
      hint: mapped.hint,
    };
  } finally {
    if (sandbox) {
      try {
        await sandbox.end({ timeout: 2 });
      } catch {
        // Session is discarded either way; temp tables cannot survive end().
      }
    }
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
    columnNames.map((column) => {
      const match = Object.keys(row).find(
        (key) => key.toLowerCase() === column.toLowerCase()
      );
      return serializeCell(match ? row[match] : row[column]);
    })
  );

  if (!options.requiresOrder) {
    normalized.sort((a, b) => a.join("\u0000").localeCompare(b.join("\u0000")));
  }

  return {
    columns: columnNames,
    rows: normalized,
  };
}
