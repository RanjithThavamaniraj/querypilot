import Link from "next/link";

import { ProgressBar } from "@/components/learn/progress-bar";
import { Button } from "@/components/ui/button";
import { listPaths } from "@/lib/learn/content";
import { getLearnerProgress } from "@/lib/learn/progress";

export default async function LearnHomePage() {
  const paths = listPaths();

  const pathCards = await Promise.all(
    paths.map(async (path) => ({
      path,
      progress: await getLearnerProgress(path.slug),
    }))
  );

  const continueTarget =
    pathCards.find((card) => card.progress.continueLessonSlug)?.path ??
    pathCards[0]?.path;

  const continueProgress = continueTarget
    ? pathCards.find((card) => card.path.slug === continueTarget.slug)?.progress
    : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
      <p className="eyebrow text-ember">Learning</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
        Start learning PostgreSQL
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Begin with Foundations, then practice real SQL against a live PostgreSQL
        dataset in SQL Fundamentals.
      </p>

      {continueTarget && continueProgress?.continueLessonSlug && (
        <div className="mt-8">
          <Button
            render={
              <Link
                href={`/learn/${continueTarget.slug}/${continueProgress.continueLessonSlug}`}
              />
            }
            nativeButton={false}
          >
            Continue learning
          </Button>
        </div>
      )}

      <div className="mt-10 space-y-6">
        {pathCards.map(({ path, progress }) => (
          <section
            key={path.slug}
            className="rounded-2xl border border-border bg-paper/80 p-6 sm:p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-foreground/50">{path.levelLabel}</p>
                <h2 className="mt-2 font-heading text-3xl tracking-tight">
                  {path.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
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
                        href={`/learn/${path.slug}/${progress.continueLessonSlug}`}
                      />
                    }
                    nativeButton={false}
                  >
                    Continue
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  render={<Link href={`/learn/${path.slug}`} />}
                  nativeButton={false}
                >
                  View path
                </Button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
