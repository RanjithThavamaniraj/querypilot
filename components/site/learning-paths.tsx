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
  lessons: number;
  duration: string;
}[] = [
  { title: "Developer", difficulty: "Beginner", lessons: 42, duration: "12h" },
  { title: "Database Administration", difficulty: "Intermediate", lessons: 56, duration: "18h" },
  { title: "Performance Tuning", difficulty: "Advanced", lessons: 38, duration: "14h" },
  { title: "Security", difficulty: "Intermediate", lessons: 31, duration: "10h" },
  { title: "High Availability", difficulty: "Advanced", lessons: 27, duration: "11h" },
  { title: "Cloud PostgreSQL", difficulty: "Intermediate", lessons: 33, duration: "12h" },
  { title: "Certification Preparation", difficulty: "All levels", lessons: 64, duration: "20h" },
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
          {paths.map((path, i) => (
            <li key={path.title}>
              <a
                href="#"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-border py-6 transition-all duration-300 hover:bg-celadon/25 sm:grid-cols-[3.5rem_1.4fr_1fr_auto] sm:px-4 sm:py-7"
              >
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
                  <span className="text-sm text-foreground/50 tabular-nums">
                    {path.lessons} lessons · {path.duration}
                  </span>
                </div>
                <ArrowRight className="hidden size-4 -translate-x-1 self-center text-foreground/30 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ember sm:block" />
              </a>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-end">
          <a
            href="#"
            className="group text-sm font-medium text-foreground underline decoration-ember/40 underline-offset-8 transition-colors hover:decoration-ember"
          >
            Browse the full catalog
            <ArrowRight className="ml-1.5 inline size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
