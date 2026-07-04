import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

const updates = [
  {
    category: "Release",
    color: "text-moss",
    date: "Jun 26, 2026",
    title: "PostgreSQL 18.1 now available in all labs",
    description:
      "Every sandbox and lab environment has been upgraded. New lessons cover async I/O improvements and the updated planner.",
  },
  {
    category: "Security",
    color: "text-ember",
    date: "Jun 19, 2026",
    title: "Advisory: CVE-2026-1847 — row security policy bypass",
    description:
      "Patched versions 18.1, 17.6, and 16.10 released upstream. Our security path includes a new lesson on the mitigation.",
  },
  {
    category: "Feature",
    color: "text-plum",
    date: "Jun 12, 2026",
    title: "AI Query Analyzer 2.0",
    description:
      "Execution-plan diffing, workload-aware index suggestions, and one-click fix application in sandboxes.",
  },
  {
    category: "Community",
    color: "text-gold",
    date: "Jun 5, 2026",
    title: "pgvector 0.9 deep-dive lab published",
    description:
      "A hands-on lab covering HNSW tuning, hybrid search, and benchmarking—built with the extension's maintainers.",
  },
];

export function Updates() {
  return (
    <Section id="updates">
      <SectionHeader
        number="05"
        eyebrow="Latest Updates"
        title={
          <>
            Stay current with <em className="text-ember">PostgreSQL</em>
          </>
        }
        description="Releases, security advisories, community news, and platform updates—curated by our team."
      />
      <div className="border-b border-border">
        {updates.map((update, i) => (
          <Reveal key={update.title} delay={i * 0.06}>
            <article className="grid gap-2 border-t border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <div>
                <p className={`eyebrow ${update.color}`}>{update.category}</p>
                <time className="mt-1.5 block font-heading text-sm text-foreground/45 italic">
                  {update.date}
                </time>
              </div>
              <div>
                <h3 className="font-heading text-xl tracking-tight sm:text-2xl">
                  {update.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {update.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
