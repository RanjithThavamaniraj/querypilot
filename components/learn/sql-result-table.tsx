"use client";

import type { SqlResultSet } from "@/lib/sql/types";

export function SqlResultTable({ result }: { result: SqlResultSet }) {
  if (result.columns.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-paper/80 px-4 py-3 text-sm text-muted-foreground">
        Query succeeded. {result.rowCount} row{result.rowCount === 1 ? "" : "s"}{" "}
        returned ({result.durationMs} ms).
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-paper px-4 py-2 text-xs text-muted-foreground">
        <span>
          {result.rowCount} row{result.rowCount === 1 ? "" : "s"}
          {result.truncated ? " (truncated)" : ""}
        </span>
        <span>{result.durationMs} ms</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-celadon/30">
            <tr>
              {result.columns.map((column) => (
                <th
                  key={column.name}
                  className="px-3 py-2 font-medium text-foreground"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border">
                {result.columns.map((column) => (
                  <td
                    key={column.name}
                    className="px-3 py-2 align-top text-foreground/85"
                  >
                    {formatCell(row[column.name])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return "NULL";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
