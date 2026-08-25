export type SqlResultColumn = {
  name: string;
};

export type SqlResultSet = {
  columns: SqlResultColumn[];
  rows: Record<string, unknown>[];
  rowCount: number;
  truncated: boolean;
  durationMs: number;
};

export type SqlExecutionSuccess = {
  ok: true;
  result: SqlResultSet;
};

export type SqlExecutionFailure = {
  ok: false;
  postgresMessage: string;
  beginnerMessage: string;
  hint?: string;
};

export type SqlExecutionOutcome = SqlExecutionSuccess | SqlExecutionFailure;

export const SQL_EXECUTION_LIMITS = {
  maxSqlLength: 4_000,
  maxRows: 200,
  maxPayloadChars: 100_000,
  statementTimeoutMs: 2_000,
  rateLimitWindowMs: 60_000,
  rateLimitMax: 40,
} as const;
