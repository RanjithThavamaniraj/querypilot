"use client";

import { useState } from "react";

import { recordConceptSeenAction } from "@/lib/learn/actions";
import type { ArchitectureDiagramDefinition } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

export function ArchitectureDiagram({
  diagram,
  highlightedNodes,
}: {
  diagram: ArchitectureDiagramDefinition;
  highlightedNodes?: string[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    highlightedNodes?.[0] ?? diagram.nodes[0]?.id ?? null
  );

  const selected = diagram.nodes.find((node) => node.id === selectedId) ?? null;
  const highlight = new Set(highlightedNodes ?? []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-paper/70">
      <div className="border-b border-border px-5 py-4">
        <p className="eyebrow text-ember">{diagram.title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{diagram.description}</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.9fr)]">
        <div className="flex flex-col items-center gap-2 px-5 py-8">
          {diagram.nodes.map((node, index) => {
            const isSelected = node.id === selectedId;
            const isHighlighted = highlight.has(node.id);

            return (
              <div key={node.id} className="flex w-full max-w-sm flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(node.id);
                    void recordConceptSeenAction(
                      diagram.id === "cluster-objects"
                        ? "cluster-database-schema"
                        : diagram.id === "client-server"
                          ? "client-server"
                          : "query-flow"
                    );
                  }}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                    isSelected
                      ? "border-ember bg-ember/10 text-foreground"
                      : isHighlighted
                        ? "border-plum/40 bg-celadon/30"
                        : "border-border bg-background hover:border-ember/40"
                  )}
                >
                  <span className="font-heading text-base tracking-tight">
                    {node.label}
                  </span>
                </button>
                {index < diagram.nodes.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="my-1 h-4 w-px bg-border"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-border bg-background/60 px-5 py-6 lg:border-t-0 lg:border-l">
          {selected ? (
            <>
              <p className="eyebrow text-foreground/50">Selected</p>
              <h3 className="mt-2 font-heading text-2xl tracking-tight">
                {selected.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selected.explanation}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a node to read a beginner explanation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
