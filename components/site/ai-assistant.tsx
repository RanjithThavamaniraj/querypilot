import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

const capabilities = [
  {
    title: "Understand concepts in context",
    description:
      "Ask about MVCC, WAL, or isolation levels and get explanations tied to the lesson or lab you're in.",
  },
  {
    title: "Optimize real queries",
    description:
      "Paste any SQL and get an execution-plan-aware review: missing indexes, bad join orders, stale statistics.",
  },
  {
    title: "Troubleshoot live issues",
    description:
      "Debug locks, bloat, and replication lag with guided diagnostics instead of guesswork.",
  },
  {
    title: "Improve performance continuously",
    description:
      "Ongoing recommendations tuned to your workload—not generic best-practice checklists.",
  },
];

function ChatMock() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[26rem] flex-col items-center justify-center rounded-2xl bg-paper p-8 text-center text-foreground shadow-2xl shadow-black/30 lg:-rotate-1"
    >
      <Sparkles className="size-8 text-plum" />
      <h3 className="mt-5 font-heading text-2xl tracking-tight">AI Assistant coming soon</h3>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        Paste a query, get execution-plan-aware guidance—arriving with QueryPilot&apos;s first
        release.
      </p>
    </div>
  );
}

export function AiAssistant() {
  return (
    <Section id="ai" className="bg-plum text-honeydew">
      <SectionHeader
        number="03"
        eyebrow="AI Assistant"
        tone="dark"
        title={
          <>
            An AI that actually <em className="text-celadon">understands PostgreSQL</em>
          </>
        }
        description="Not a generic chatbot. QueryPilot's assistant reads execution plans, knows your schema, and reasons about Postgres internals."
      />
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="min-w-0">
          <ol>
            {capabilities.map((capability, i) => (
              <li key={capability.title} className="border-t border-honeydew/15 py-6">
                <div className="flex gap-5">
                  <span className="font-heading text-sm text-celadon/80 italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg tracking-tight text-honeydew">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-honeydew/65">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="min-w-0">
          <ChatMock />
        </Reveal>
      </div>
    </Section>
  );
}
