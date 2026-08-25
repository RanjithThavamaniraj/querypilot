import { SQL_EXECUTION_LIMITS } from "@/lib/sql/types";

const BLOCKED_PATTERN =
  /\b(insert|update|delete|truncate|create|drop|alter|copy|grant|revoke|set\s+role|reset\s+role|call|do\s+\$|execute|prepare|listen|notify|load|vacuum|analyze|reindex|cluster|comment|security\s+label|lock|refresh\s+materialized|import|export|pg_read_file|pg_write_file|lo_import|lo_export)\b/i;

export function assertSafeLearnerSql(raw: string): string {
  const sql = raw.trim();

  if (!sql) {
    throw new Error("Enter a SQL statement before running.");
  }

  if (sql.length > SQL_EXECUTION_LIMITS.maxSqlLength) {
    throw new Error(
      `SQL is too long. Keep statements under ${SQL_EXECUTION_LIMITS.maxSqlLength} characters.`
    );
  }

  // Strip a single trailing semicolon for convenience, then reject additional statements.
  const withoutTrailing = sql.replace(/;+\s*$/, "");
  if (withoutTrailing.includes(";")) {
    throw new Error("Only one SQL statement is allowed at a time.");
  }

  if (BLOCKED_PATTERN.test(withoutTrailing)) {
    throw new Error(
      "That statement is not allowed in Phase 2 practice. Use a single SELECT query against the shop tables."
    );
  }

  // Module 1 is SELECT-only. WITH ... SELECT is allowed; plain SELECT required as core.
  if (!/^\s*(with|select)\b/i.test(withoutTrailing)) {
    throw new Error("Phase 2 Module 1 only allows SELECT queries (WITH ... SELECT is fine).");
  }

  return withoutTrailing;
}
