import {
  Cable,
  Calculator,
  DatabaseBackup,
  ListChecks,
  Recycle,
  SearchCode,
  Settings2,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

const tools = [
  {
    icon: Cable,
    title: "Connection String Generator",
    description: "Build and validate connection URIs for every driver and pooler.",
  },
  {
    icon: Zap,
    title: "Index Advisor",
    description: "Paste a workload, get ranked index candidates with size estimates.",
  },
  {
    icon: Recycle,
    title: "VACUUM Planner",
    description: "Tune autovacuum thresholds against your real table churn.",
  },
  {
    icon: Calculator,
    title: "Storage Calculator",
    description: "Forecast disk, WAL, and index growth before it surprises you.",
  },
  {
    icon: DatabaseBackup,
    title: "Backup Planner",
    description: "Design RPO/RTO-driven backup schedules with retention math.",
  },
  {
    icon: Settings2,
    title: "Configuration Explorer",
    description: "Every GUC explained, with workload-aware recommended values.",
  },
  {
    icon: ListChecks,
    title: "Performance Checklist",
    description: "A production-readiness audit you can run in ten minutes.",
  },
  {
    icon: SearchCode,
    title: "Query Analyzer",
    description: "Visual EXPLAIN plans with bottlenecks highlighted automatically.",
  },
];

export function Toolkit() {
  return (
    <Section id="tools">
      <SectionHeader
        number="04"
        eyebrow="DBA Toolkit"
        title={
          <>
            Professional tools, <em className="text-ember">zero setup</em>
          </>
        }
        description="The utilities working DBAs reach for daily—arriving with QueryPilot's first release."
      />
      <div className="grid sm:grid-cols-2 sm:gap-x-10">
        {tools.map((tool, i) => (
          <Reveal key={tool.title} delay={(i % 2) * 0.06}>
            <div className="group flex h-full gap-5 border-t border-border py-7 transition-colors">
              <tool.icon className="mt-1 size-5 shrink-0 text-foreground/40 transition-colors duration-300 group-hover:text-ember" />
              <div>
                <h3 className="font-heading text-lg tracking-tight transition-colors duration-300 group-hover:text-ember">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
