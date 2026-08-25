import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeader } from "@/components/site/section";

type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "All levels";

const difficultyDot: Record<Difficulty, string> = {
  Beginner: "bg-moss",
  Intermediate: "bg-gold",
  Advanced: "bg-ember",
  "All levels": "bg-plum",
};

const paths: {
  title: string;
  difficulty: Difficulty;
  available?: boolean;
  href?: string;
}[] = [
  {
    title: "Foundations",
    difficulty: "Beginner",
    available: true,
    href: "/learn/foundations",
  },
  {
    title: "SQL Fundamentals",
    difficulty: "Beginner",
    available: true,
    href: "/learn/sql-fundamentals",
  },
  { title: "Developer", difficulty: "Beginner" },
  { title: "Database Administration", difficulty: "Intermediate" },
  { title: "Performance Tuning", difficulty: "Advanced" },
  { title: "Security", difficulty: "Intermediate" },
  { title: "High Availability", difficulty: "Advanced" },
  { title: "Cloud PostgreSQL", difficulty: "Intermediate" },
  { title: "Certification Preparation", difficulty: "All levels" },
];

export function LearningPaths() {
  return (
    <Section id="learning-paths">
      <SectionHeader
        number="02"
        eyebrow="Learning Paths"
        title={
          <>
            A guided path for <em className="text-ember">every role</em>
          </>
        }
        description="Pick a track that matches where you are—and where you want to be. Progress carries across paths."
      />
      <Reveal>
        <ol className="border-b border-border">
          {paths.map((path, i) => {
            const content = (
              <>
                <span className="font-heading text-sm text-foreground/35 italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl tracking-tight transition-colors group-hover:text-ember sm:text-2xl">
                  {path.title}
                </h3>
                <div className="col-start-2 flex flex-wrap items-baseline gap-x-6 gap-y-1 sm:col-start-3">
                  <span className="flex items-center gap-2 text-xs tracking-wide text-foreground/55 uppercase">
                    <span
                      className={`size-1.5 rounded-full ${difficultyDot[path.difficulty]}`}
                    />
                    {path.difficulty}
                  </span>
                  <span className="text-sm text-foreground/50">
                    {path.available ? "Available now" : "Curriculum in development"}
                  </span>
                </div>
                {path.available && (
                  <ArrowRight className="hidden size-4 -translate-x-1 self-center text-foreground/30 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember sm:block" />
                )}
              </>
            );

            return (
              <li key={path.title}>
                {path.href ? (
                  <Link
                    href={path.href}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-border py-6 transition-all duration-300 hover:bg-celadon/25 sm:grid-cols-[3.5rem_1.4fr_1fr_auto] sm:px-4 sm:py-7"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-border py-6 sm:grid-cols-[3.5rem_1.4fr_1fr_auto] sm:px-4 sm:py-7">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex flex-wrap justify-end gap-4">
          <Link
            href="/learn/foundations"
            className="text-sm font-medium text-ember transition-colors hover:text-ember-deep"
          >
            Start with Foundations →
          </Link>
          <Link
            href="/learn/sql-fundamentals"
            className="text-sm font-medium text-ember transition-colors hover:text-ember-deep"
          >
            Practice SQL →
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
