import { SQL_EXECUTION_LIMITS } from "@/lib/sql/types";

const BLOCKED_PATTERN =
  /\b(truncate|create|drop|alter|copy|grant|revoke|set\s+role|reset\s+role|set\s+session\s+authorization|set\s+search_path|call|do\s+\$|execute|prepare|listen|notify|load|vacuum|analyze|reindex|cluster|comment|security\s+label|lock|refresh\s+materialized|import|export|pg_read_file|pg_write_file|lo_import|lo_export)\b/i;

const QUALIFIED_WRITE_PATTERN =
  /\b(insert\s+into|update|delete\s+from)\s+shop\./i;

const ALLOWED_START =
  /^(with|select|insert|update|delete|begin|start|commit|end|rollback|abort|savepoint|release)\b/i;

export function splitSqlStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  let inSingle = false;
  let inDouble = false;

  for (let index = 0; index < sql.length; index += 1) {
    const char = sql[index];

    if (char === "'" && !inDouble) {
      if (inSingle && sql[index + 1] === "'") {
        current += "''";
        index += 1;
        continue;
      }
      inSingle = !inSingle;
      current += char;
      continue;
    }

    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
      current += char;
      continue;
    }

    if (char === ";" && !inSingle && !inDouble) {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed);
      current = "";
      continue;
    }

    current += char;
  }

  const trimmed = current.trim();
  if (trimmed) statements.push(trimmed);
  return statements;
}

export function assertSafeLearnerSql(raw: string): string[] {
  const sql = raw.trim();

  if (!sql) {
    throw new Error("Enter a SQL statement before running.");
  }

  if (sql.length > SQL_EXECUTION_LIMITS.maxSqlLength) {
    throw new Error(
      `SQL is too long. Keep statements under ${SQL_EXECUTION_LIMITS.maxSqlLength} characters.`
    );
  }

  const statements = splitSqlStatements(sql);

  if (statements.length === 0) {
    throw new Error("Enter a SQL statement before running.");
  }

  if (statements.length > SQL_EXECUTION_LIMITS.maxStatements) {
    throw new Error(
      `Too many statements. Keep scripts to ${SQL_EXECUTION_LIMITS.maxStatements} statements or fewer.`
    );
  }

  for (const statement of statements) {
    if (BLOCKED_PATTERN.test(statement)) {
      throw new Error(
        "That statement is not allowed in SQL practice. Use SELECT, INSERT, UPDATE, DELETE, or transaction control against the shop tables."
      );
    }

    if (QUALIFIED_WRITE_PATTERN.test(statement)) {
      throw new Error(
        "Write to the practice tables using unqualified names such as customers, not shop.customers."
      );
    }

    if (!ALLOWED_START.test(statement)) {
      throw new Error(
        "SQL practice allows SELECT, INSERT, UPDATE, DELETE, WITH, and transaction statements (BEGIN, COMMIT, ROLLBACK)."
      );
    }
  }

  return statements;
}
