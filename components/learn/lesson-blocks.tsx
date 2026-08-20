import Link from "next/link";

import { getArchitectureConcept, getDiagram } from "@/lib/learn/content";
import type { ArchitectureConceptId, LessonBlock } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

import { ArchitectureDiagram } from "./architecture-diagram";

function ConceptCallout({ conceptId }: { conceptId: ArchitectureConceptId }) {
  const concept = getArchitectureConcept(conceptId);
  if (!concept) return null;
  const layer = concept.layers.find((item) => item.layer === 0) ?? concept.layers[0];

  return (
    <aside className="rounded-2xl border border-plum/25 bg-plum/5 px-5 py-4">
      <p className="eyebrow text-plum">Architecture concept</p>
      <h3 className="mt-2 font-heading text-xl tracking-tight">{concept.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {layer.explanation}
      </p>
      {concept.dba?.what && (
        <p className="mt-3 text-sm text-foreground/80">
          <span className="font-medium text-foreground">Why it matters later: </span>
          {concept.dba.what}
        </p>
      )}
    </aside>
  );
}

export function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="font-heading text-2xl tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={index}
                className="text-base leading-relaxed text-foreground/85"
              >
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/85"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "example":
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-celadon/20 px-5 py-4"
              >
                <p className="eyebrow text-moss">Example</p>
                <h3 className="mt-2 font-heading text-lg tracking-tight">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {block.body}
                </p>
              </div>
            );
          case "code":
            return (
              <figure key={index} className="overflow-hidden rounded-2xl border border-border">
                {block.caption && (
                  <figcaption className="border-b border-border bg-paper px-4 py-2 text-xs text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
                <pre className="overflow-x-auto bg-ink px-4 py-4 text-sm text-honeydew">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "callout":
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border px-5 py-4 text-sm leading-relaxed",
                  block.tone === "tip"
                    ? "border-moss/30 bg-moss/10 text-foreground/85"
                    : "border-border bg-paper text-muted-foreground"
                )}
              >
                {block.text}
              </div>
            );
          case "diagram":
            return (
              <ArchitectureDiagram
                key={index}
                diagram={getDiagram(block.diagramId)}
              />
            );
          case "concept-callout":
            return <ConceptCallout key={index} conceptId={block.conceptId} />;
          case "dba-later":
            return (
              <div
                key={index}
                className="rounded-2xl border border-dashed border-ember/30 bg-ember/5 px-5 py-4 text-sm leading-relaxed text-foreground/80"
              >
                <p className="eyebrow text-ember">For later as a DBA</p>
                <p className="mt-2">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function LessonNav({
  pathSlug,
  previous,
  next,
}: {
  pathSlug: string;
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      {previous ? (
        <Link
          href={`/learn/${pathSlug}/${previous.slug}`}
          className="text-sm text-foreground/70 transition-colors hover:text-ember"
        >
          ← {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/learn/${pathSlug}/${next.slug}`}
          className="text-sm font-medium text-ember transition-colors hover:text-ember-deep"
        >
          {next.title} →
        </Link>
      ) : (
        <Link
          href={`/learn/${pathSlug}`}
          className="text-sm font-medium text-ember"
        >
          Back to path →
        </Link>
      )}
    </div>
  );
}
