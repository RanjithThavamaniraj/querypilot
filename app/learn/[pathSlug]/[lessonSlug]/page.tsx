import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonView } from "@/components/learn/lesson-view";
import {
  getAdjacentLessons,
  getExercise,
  getLesson,
  getPath,
  getQuiz,
} from "@/lib/learn/content";
import { getLearnerProgress } from "@/lib/learn/progress";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ pathSlug: string; lessonSlug: string }>;
}) {
  const { pathSlug, lessonSlug } = await params;
  const path = getPath(pathSlug);
  const lesson = getLesson(pathSlug, lessonSlug);
  if (!path || !lesson) notFound();

  const adjacent = getAdjacentLessons(pathSlug, lessonSlug);
  const progress = await getLearnerProgress(pathSlug);
  const exercise = lesson.exerciseId ? getExercise(lesson.exerciseId) : null;
  const quiz = lesson.quizId ? getQuiz(lesson.quizId) : null;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8 lg:py-16">
      <aside className="hidden lg:block">
        <Link
          href={`/learn/${path.slug}`}
          className="text-sm text-foreground/60 transition-colors hover:text-ember"
        >
          ← {path.title}
        </Link>
        <p className="mt-6 eyebrow text-foreground/45">Module</p>
        <p className="mt-2 font-heading text-lg tracking-tight">
          {path.modules[0].title}
        </p>
        <ol className="mt-6 space-y-2">
          {path.modules[0].lessons.map((item, index) => {
            const status = progress.lessonStatuses[item.slug];
            const active = item.slug === lesson.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={`/learn/${path.slug}/${item.slug}`}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-ember/10 text-ember"
                      : "text-foreground/70 hover:bg-celadon/30 hover:text-foreground"
                  }`}
                >
                  <span className="text-xs text-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block leading-snug">{item.title}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-wide text-foreground/40">
                    {status.replace("_", " ")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </aside>

      <LessonView
        pathSlug={path.slug}
        lesson={lesson}
        exercise={exercise}
        quiz={quiz}
        status={progress.lessonStatuses[lesson.slug]}
        previous={
          adjacent.previous
            ? { slug: adjacent.previous.slug, title: adjacent.previous.title }
            : null
        }
        next={
          adjacent.next
            ? { slug: adjacent.next.slug, title: adjacent.next.title }
            : null
        }
        positionLabel={`Lesson ${adjacent.index + 1} of ${adjacent.total}`}
      />
    </div>
  );
}
