"use client";

import { useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import type { ExerciseDefinition } from "@/lib/learn/types";
import { cn } from "@/lib/utils";

export function ExercisePanel({
  exercise,
  onPassed,
}: {
  exercise: ExerciseDefinition;
  onPassed?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const score = useMemo(() => {
    return exercise.items.reduce((total, item) => {
      return total + (answers[item.id] === item.correctOptionId ? 1 : 0);
    }, 0);
  }, [answers, exercise.items]);

  const passed = score >= exercise.passScore;

  return (
    <section className="rounded-2xl border border-border bg-paper/80 p-6">
      <p className="eyebrow text-ember">Exercise</p>
      <h3 className="mt-2 font-heading text-2xl tracking-tight">{exercise.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {exercise.instructions}
      </p>

      <div className="mt-6 space-y-5">
        {exercise.items.map((item, index) => {
          const selected = answers[item.id];
          const isCorrect = selected === item.correctOptionId;

          return (
            <div key={item.id} className="border-t border-border pt-5">
              <p className="text-sm font-medium text-foreground">
                {index + 1}. {item.prompt}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exercise.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    disabled={submitted && passed}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [item.id]: option.id,
                      }))
                    }
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      selected === option.id
                        ? "border-ember bg-ember/10 text-foreground"
                        : "border-border hover:border-ember/40"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {submitted && (
                <p
                  className={cn(
                    "mt-2 text-sm",
                    isCorrect ? "text-moss" : "text-ember-deep"
                  )}
                >
                  {isCorrect ? "Correct. " : "Not quite. "}
                  {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          disabled={
            pending ||
            Object.keys(answers).length < exercise.items.length ||
            (submitted && passed)
          }
          onClick={() => {
            startTransition(() => {
              setSubmitted(true);
              if (score >= exercise.passScore) {
                onPassed?.();
              }
            });
          }}
        >
          Check answers
        </Button>
        {submitted && (
          <p className="text-sm text-muted-foreground">
            Score: {score}/{exercise.items.length}
            {passed ? " — passed" : ` — need ${exercise.passScore} to pass`}
          </p>
        )}
        {submitted && !passed && (
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
          >
            Retry
          </Button>
        )}
      </div>
    </section>
  );
}
