import Link from "next/link";
import { notFound } from "next/navigation";

import { ProgressBar } from "@/components/learn/progress-bar";
import { Button } from "@/components/ui/button";
import { getPath } from "@/lib/learn/content";
import { getLearnerProgress } from "@/lib/learn/progress";

export default async function PathPage({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}) {
  const { pathSlug } = await params;
  const path = getPath(pathSlug);
  if (!path) notFound();

  const progress = await getLearnerProgress(path.slug);
  const moduleDef = path.modules[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
      <Link
        href="/learn"
        className="text-sm text-foreground/60 transition-colors hover:text-ember"
      >
        ← All learning
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="eyebrow text-ember">{path.levelLabel}</p>
          <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
            {path.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {path.description}
          </p>

          <div className="mt-8">
            <h2 className="font-heading text-2xl tracking-tight">
              {moduleDef.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {moduleDef.description}
            </p>

            <ol className="mt-6 border-y border-border">
              {moduleDef.lessons.map((lesson, index) => {
                const status = progress.lessonStatuses[lesson.slug];
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${path.slug}/${lesson.slug}`}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t border-border py-5 transition-colors first:border-t-0 hover:bg-celadon/20 sm:px-3"
                    >
                      <span className="font-heading text-sm italic text-foreground/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-heading text-xl tracking-tight transition-colors group-hover:text-ember">
                          {lesson.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {lesson.summary}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-wide text-foreground/50">
                        {status.replace("_", " ")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-paper/80 p-6">
          <ProgressBar
            value={progress.completionPercent}
            label="Module progress"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            {progress.completedLessonCount} of {progress.totalLessonCount}{" "}
            lessons complete
          </p>
          {progress.bestQuizScore !== null && (
            <p className="mt-2 text-sm text-muted-foreground">
              Best checkpoint score: {progress.bestQuizScore}/10
              {progress.quizPassed ? " (passed)" : ""}
            </p>
          )}
          {progress.continueLessonSlug && (
            <Button
              className="mt-6 w-full"
              render={
                <Link
                  href={`/learn/${path.slug}/${progress.continueLessonSlug}`}
                />
              }
              nativeButton={false}
            >
              Continue learning
            </Button>
          )}
        </aside>
      </div>
    </div>
  );
}
