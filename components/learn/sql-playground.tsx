"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  checkSqlChallengeAction,
  runSqlAction,
} from "@/lib/learn/actions";
import type { SqlChallengeDefinition } from "@/lib/learn/types";
import type { SqlExecutionOutcome } from "@/lib/sql/types";
import { cn } from "@/lib/utils";

import { SqlResultTable } from "./sql-result-table";

export function SqlPlayground({
  pathSlug,
  lessonSlug,
  title = "SQL editor",
  initialSQL,
  challenge,
  onChallengePassed,
}: {
  pathSlug: string;
  lessonSlug: string;
  title?: string;
  initialSQL: string;
  challenge?: SqlChallengeDefinition;
  onChallengePassed?: () => void;
}) {
  const [sql, setSql] = useState(initialSQL);
  const [outcome, setOutcome] = useState<SqlExecutionOutcome | null>(null);
  const [checkFeedback, setCheckFeedback] = useState<{
    passed: boolean;
    feedback: string;
    hint?: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <section className="rounded-2xl border border-border bg-paper/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-ember">
            {challenge ? "SQL challenge" : "Try it"}
          </p>
          <h3 className="mt-2 font-heading text-xl tracking-tight">
            {challenge?.title ?? title}
          </h3>
          {challenge && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {challenge.prompt}
            </p>
          )}
        </div>
      </div>

      <label className="sr-only" htmlFor={`sql-${challenge?.id ?? "playground"}`}>
        SQL
      </label>
      <textarea
        id={`sql-${challenge?.id ?? "playground"}`}
        value={sql}
        onChange={(event) => setSql(event.target.value)}
        spellCheck={false}
        className="mt-5 min-h-40 w-full rounded-xl border border-border bg-ink px-4 py-3 font-mono text-sm text-honeydew outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              setCheckFeedback(null);
              const result = await runSqlAction({
                sql,
                pathSlug,
                lessonSlug,
              });
              setOutcome(result);
            });
          }}
        >
          Run Query
        </Button>
        {challenge && (
          <Button
            disabled={pending}
            variant="secondary"
            onClick={() => {
              startTransition(async () => {
                const result = await checkSqlChallengeAction({
                  challengeId: challenge.id,
                  sql,
                  pathSlug,
                  lessonSlug,
                });
                setOutcome(result.learnerOutcome);
                setCheckFeedback({
                  passed: result.passed,
                  feedback: result.feedback,
                  hint: result.hint,
                });
                if (result.passed) onChallengePassed?.();
              });
            }}
          >
            Check Answer
          </Button>
        )}
        <Button
          disabled={pending}
          variant="outline"
          onClick={() => {
            setSql(challenge?.initialSQL ?? initialSQL);
            setOutcome(null);
            setCheckFeedback(null);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {pending && (
          <p className="text-sm text-muted-foreground">Running against PostgreSQL…</p>
        )}

        {outcome && !outcome.ok && (
          <div className="rounded-xl border border-ember/30 bg-ember/5 px-4 py-3 text-sm">
            <p className="font-medium text-ember-deep">PostgreSQL error</p>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-foreground/80">
              {outcome.postgresMessage}
            </pre>
            <p className="mt-3 text-foreground/85">{outcome.beginnerMessage}</p>
            {outcome.hint && (
              <p className="mt-2 text-muted-foreground">Hint: {outcome.hint}</p>
            )}
          </div>
        )}

        {outcome?.ok && <SqlResultTable result={outcome.result} />}

        {checkFeedback && (
          <div
            className={cn(
              "rounded-xl border px-4 py-3 text-sm",
              checkFeedback.passed
                ? "border-moss/30 bg-moss/10 text-foreground/85"
                : "border-ember/30 bg-ember/5 text-foreground/85"
            )}
          >
            <p className="font-medium">
              {checkFeedback.passed ? "Correct" : "Not yet"}
            </p>
            <p className="mt-2">{checkFeedback.feedback}</p>
            {!checkFeedback.passed && checkFeedback.hint && (
              <p className="mt-2 text-muted-foreground">Hint: {checkFeedback.hint}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
