import {
  Cloud,
  FlaskConical,
  Gauge,
  GraduationCap,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  comingSoon?: boolean;
};

const pillars: Pillar[] = [
  {
    icon: GraduationCap,
    title: "Interactive Learning",
    description:
      "Master PostgreSQL through structured lessons that build from fundamentals to advanced production concepts.",
  },
  {
    icon: FlaskConical,
    title: "Hands-on Labs",
    description:
      "Practice real PostgreSQL scenarios directly in your browser with guided exercises and practical challenges.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Get explanations, query optimization advice, and guidance while learning.",
    comingSoon: true,
  },
  {
    icon: Wrench,
    title: "DBA Toolkit",
    description:
      "Access practical utilities for backups, indexing, configuration, maintenance, and database operations.",
    comingSoon: true,
  },
  {
    icon: Gauge,
    title: "Performance Tuning",
    description:
      "Learn how to analyze execution plans, improve queries, optimize indexes, and troubleshoot bottlenecks.",
  },
  {
    icon: Cloud,
    title: "Cloud PostgreSQL",
    description:
      "Explore Azure Database for PostgreSQL, deployment strategies, monitoring, backups, scaling, and production best practices.",
  },
];

export function ProductOverview() {
  return (
    <Section>
      <Reveal className="mx-auto mb-16 max-w-[720px] text-center sm:mb-20">
        <p className="eyebrow text-foreground/55">The Platform</p>
        <h2 className="mt-4 font-heading text-4xl tracking-tight text-balance sm:text-5xl">
          Everything you need to master <em className="text-ember">PostgreSQL</em>.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Learn, practice, optimize, and deploy PostgreSQL with a single modern
          platform designed for developers, database administrators, and cloud
          engineers.
        </p>
      </Reveal>
      <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={(i % 3) * 0.08}>
            <div className="group border-t border-border py-10 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/50">
              <pillar.icon className="size-5 text-foreground/40 transition-colors duration-300 group-hover:text-ember" />
              <div className="mt-5 flex items-baseline gap-3">
                <h3 className="font-heading text-xl tracking-tight">
                  {pillar.title}
                </h3>
                {pillar.comingSoon && (
                  <span className="eyebrow text-[10px] text-ember/70">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
