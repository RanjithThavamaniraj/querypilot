import { CircleCheck, Send, Sparkles, Zap } from "lucide-react";

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
      className="rounded-2xl bg-paper text-foreground shadow-2xl shadow-black/30 lg:-rotate-1"
    >
      <div className="flex items-center gap-2.5 border-b border-foreground/10 px-5 py-3.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-plum">
          <Sparkles className="size-3.5 text-honeydew" />
        </span>
        <div>
          <p className="text-xs font-medium">QueryPilot AI</p>
          <p className="flex items-center gap-1 text-[10px] text-moss">
            <span className="size-1.5 rounded-full bg-moss" />
            Connected to sandbox-db
          </p>
        </div>
      </div>

      <div className="space-y-5 p-5 text-xs leading-relaxed">
        {/* user message with SQL */}
        <div className="ml-6">
          <p className="mb-2 text-foreground/60">This query takes 4 seconds—what am I missing?</p>
          <pre className="overflow-x-auto rounded-lg bg-plum-deep p-3 font-mono text-[10.5px] text-honeydew/90">
            <code>{`SELECT c.name, SUM(o.total)
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.created_at > now() - interval '30 days'
GROUP BY c.name;`}</code>
          </pre>
        </div>

        {/* AI reply as annotated note, not a bubble */}
        <div className="mr-6 border-l-2 border-ember pl-4">
          <p className="text-foreground/85">
            Your plan shows a <span className="font-mono text-ember-deep">Seq Scan</span> on{" "}
            <span className="font-mono text-ember-deep">orders</span> (2.1M rows). Two
            opportunities:
          </p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex gap-2">
              <Zap className="mt-0.5 size-3.5 shrink-0 text-ember" />
              <span className="text-foreground/70">
                Add a partial index:{" "}
                <span className="font-mono text-[10.5px] text-ember-deep">
                  CREATE INDEX ON orders (customer_id, created_at)
                </span>
              </span>
            </li>
            <li className="flex gap-2">
              <Zap className="mt-0.5 size-3.5 shrink-0 text-ember" />
              <span className="text-foreground/70">
                <span className="font-mono text-[10.5px] text-ember-deep">work_mem</span> is 4MB —
                the hash aggregate spills to disk. Try 32MB for this workload.
              </span>
            </li>
          </ul>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-moss">
            <CircleCheck className="size-3.5" />
            Estimated improvement: 4.1s → 180ms
          </p>
        </div>

        {/* input */}
        <div className="flex items-center gap-2 rounded-full border border-foreground/15 py-2 pr-2 pl-4 text-foreground/45">
          Ask about your database…
          <span className="ml-auto flex size-7 items-center justify-center rounded-full bg-ember text-primary-foreground">
            <Send className="size-3" />
          </span>
        </div>
      </div>
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
