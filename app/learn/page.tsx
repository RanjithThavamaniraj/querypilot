import Link from "next/link";

import { ProgressBar } from "@/components/learn/progress-bar";
import { Button } from "@/components/ui/button";
import { listPaths } from "@/lib/learn/content";
import { getLearnerProgress } from "@/lib/learn/progress";

export default async function LearnHomePage() {
  const paths = listPaths();
  const foundations = paths[0];
  const progress = foundations
    ? await getLearnerProgress(foundations.slug)
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
      <p className="eyebrow text-ember">Learning</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
        Start learning PostgreSQL
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        QueryPilot is a progressive learning platform. Begin with Foundations:
        databases, PostgreSQL basics, and the architecture map you will deepen
        for the rest of the journey.
      </p>

      {foundations && progress && (
        <section className="mt-10 rounded-2xl border border-border bg-paper/80 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-foreground/50">{foundations.levelLabel}</p>
              <h2 className="mt-2 font-heading text-3xl tracking-tight">
                {foundations.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {foundations.description}
              </p>
              <div className="mt-6 max-w-md">
                <ProgressBar
                  value={progress.completionPercent}
                  label={`${progress.completedLessonCount} of ${progress.totalLessonCount} lessons complete`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {progress.continueLessonSlug ? (
                <Button
                  render={
                    <Link
                      href={`/learn/${foundations.slug}/${progress.continueLessonSlug}`}
                    />
                  }
                  nativeButton={false}
                >
                  Continue learning
                </Button>
              ) : (
                <Button
                  render={<Link href={`/learn/${foundations.slug}`} />}
                  nativeButton={false}
                >
                  Review path
                </Button>
              )}
              <Button
                variant="outline"
                render={<Link href={`/learn/${foundations.slug}`} />}
                nativeButton={false}
              >
                View path
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
