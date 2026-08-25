"use client";

import { useState } from "react";

import { shopTables } from "@/content/learn/datasets/shop/meta";
import { cn } from "@/lib/utils";

export function SqlSchemaPanel({ datasetId = "shop" }: { datasetId?: "shop" }) {
  const tables = datasetId === "shop" ? shopTables : [];
  const [active, setActive] = useState(tables[0]?.name ?? "");

  const table = tables.find((item) => item.name === active) ?? tables[0];

  if (!table) return null;

  return (
    <section className="rounded-2xl border border-border bg-paper/80 p-5">
      <p className="eyebrow text-ember">Dataset · {datasetId}</p>
      <h3 className="mt-2 font-heading text-xl tracking-tight">Schema panel</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Inspect the tables you can query in this module.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tables.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(item.name)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              item.name === table.name
                ? "border-ember bg-ember/10 text-foreground"
                : "border-border hover:border-ember/40"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <h4 className="font-heading text-lg tracking-tight">{table.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{table.description}</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-celadon/30">
              <tr>
                <th className="px-3 py-2 font-medium">Column</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {table.columns.map((column) => (
                <tr key={column.name} className="border-t border-border">
                  <td className="px-3 py-2 font-mono text-xs">{column.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{column.type}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {column.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-ink px-3 py-2 text-xs text-honeydew">
          <code>{table.sampleQuery}</code>
        </pre>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <p className="border-b border-border bg-paper px-3 py-2 text-xs text-muted-foreground">
            Sample rows
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-celadon/20">
                <tr>
                  {table.columns.map((column) => (
                    <th key={column.name} className="px-3 py-2 font-medium">
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.sampleRows.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    {table.columns.map((column) => (
                      <td key={column.name} className="px-3 py-2 text-foreground/80">
                        {String(row[column.name] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
