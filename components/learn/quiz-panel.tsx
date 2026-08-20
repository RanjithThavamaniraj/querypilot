"use client";

import { useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { submitQuizAction } from "@/lib/learn/actions";
import type { QuizDefinition } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

export function QuizPanel({
  quiz,
  pathSlug,
  lessonSlug,
}: {
  quiz: QuizDefinition;
  pathSlug: string;
  lessonSlug: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  const allAnswered = useMemo(
    () => quiz.questions.every((question) => answers[question.id]),
    [answers, quiz.questions]
  );

  return (
    <section className="rounded-2xl border border-border bg-paper/80 p-6">
      <p className="eyebrow text-ember">Checkpoint quiz</p>
      <h3 className="mt-2 font-heading text-2xl tracking-tight">{quiz.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {quiz.description} Pass with {quiz.passScore}/{quiz.questions.length}.
      </p>

      <div className="mt-6 space-y-6">
        {quiz.questions.map((question, index) => {
          const selected = answers[question.id];
          const showFeedback = Boolean(result);

          return (
            <div key={question.id} className="border-t border-border pt-5">
              <p className="text-sm font-medium">
                {index + 1}. {question.prompt}
              </p>
              <div className="mt-3 space-y-2">
                {question.options.map((option) => {
                  const isSelected = selected === option.id;
                  const isCorrect = option.id === question.correctOptionId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={Boolean(result)}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: option.id,
                        }))
                      }
                      className={cn(
                        "block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        isSelected
                          ? "border-ember bg-ember/10"
                          : "border-border hover:border-ember/40",
                        showFeedback && isCorrect && "border-moss bg-moss/10",
                        showFeedback &&
                          isSelected &&
                          !isCorrect &&
                          "border-ember-deep bg-ember/5"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {showFeedback && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!result ? (
          <Button
            disabled={!allAnswered || pending}
            onClick={() => {
              const score = quiz.questions.reduce((total, question) => {
                return (
                  total +
                  (answers[question.id] === question.correctOptionId ? 1 : 0)
                );
              }, 0);
              const passed = score >= quiz.passScore;

              startTransition(async () => {
                await submitQuizAction({
                  quizId: quiz.id,
                  score,
                  maxScore: quiz.questions.length,
                  passed,
                  responses: answers,
                  pathSlug,
                  lessonSlug,
                });
                setResult({ score, passed });
              });
            }}
          >
            Submit quiz
          </Button>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Score: {result.score}/{quiz.questions.length}
              {result.passed ? " — passed. Lesson marked complete." : " — not yet passed."}
            </p>
            {!result.passed && (
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                }}
              >
                Retry
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
