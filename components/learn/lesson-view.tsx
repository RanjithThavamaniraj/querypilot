"use client";

import { useEffect, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  completeLessonAction,
  recordConceptSeenAction,
  startLessonAction,
} from "@/lib/learn/actions";
import type {
  ExerciseDefinition,
  LessonDefinition,
  QuizDefinition,
} from "@/lib/learn/types";

import { ExercisePanel } from "./exercise-panel";
import { LessonBlocks, LessonNav } from "./lesson-blocks";
import { QuizPanel } from "./quiz-panel";

export function LessonView({
  pathSlug,
  lesson,
  exercise,
  quiz,
  status,
  previous,
  next,
  positionLabel,
}: {
  pathSlug: string;
  lesson: LessonDefinition;
  exercise: ExerciseDefinition | null;
  quiz: QuizDefinition | null;
  status: string;
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  positionLabel: string;
}) {
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    void startLessonAction(pathSlug, lesson.slug);
    for (const conceptId of lesson.conceptIds) {
      void recordConceptSeenAction(conceptId);
    }
  }, [pathSlug, lesson.slug, lesson.conceptIds]);

  return (
    <article>
      <div className="mb-8">
        <p className="eyebrow text-ember">{positionLabel}</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight text-balance sm:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {lesson.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-foreground/60">
          <span>~{lesson.estimatedMinutes} min</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{status.replace("_", " ")}</span>
        </div>
      </div>

      <LessonBlocks
        blocks={lesson.blocks}
        pathSlug={pathSlug}
        lessonSlug={lesson.slug}
      />

      {exercise && (
        <div className="mt-10">
          <ExercisePanel
            exercise={exercise}
            onPassed={() => {
              if (!quiz) {
                startTransition(async () => {
                  await completeLessonAction(pathSlug, lesson.slug);
                });
              }
            }}
          />
        </div>
      )}

      {quiz && (
        <div className="mt-10">
          <QuizPanel quiz={quiz} pathSlug={pathSlug} lessonSlug={lesson.slug} />
        </div>
      )}

      {!quiz && (
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {status !== "completed" ? (
            <Button
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await completeLessonAction(pathSlug, lesson.slug);
                });
              }}
            >
              Mark lesson complete
            </Button>
          ) : (
            <p className="text-sm text-moss">Lesson completed</p>
          )}
        </div>
      )}

      <LessonNav pathSlug={pathSlug} previous={previous} next={next} />
    </article>
  );
}
