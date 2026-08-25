"use server";

import { revalidatePath } from "next/cache";

import { getSqlChallenge } from "@/lib/learn/content";
import {
  ensureGuestUserId,
  getGuestUserIdOrNull,
  markLessonCompleted,
  markLessonStarted,
  recordConceptSeen,
  recordExerciseAttempt,
  recordQuizAttempt,
} from "@/lib/learn/progress";
import { executeLearnerSql } from "@/lib/sql/execute";
import { isLabConfigured } from "@/lib/sql/lab-db";
import { validateSqlChallenge } from "@/lib/sql/validate";

export async function ensureGuestAction() {
  const existing = await getGuestUserIdOrNull();
  if (existing) return;
  await ensureGuestUserId();
  revalidatePath("/learn");
}

export async function startLessonAction(pathSlug: string, lessonSlug: string) {
  await markLessonStarted(pathSlug, lessonSlug);
  revalidatePath(`/learn/${pathSlug}`);
  revalidatePath(`/learn/${pathSlug}/${lessonSlug}`);
  revalidatePath("/learn");
}

export async function completeLessonAction(pathSlug: string, lessonSlug: string) {
  await markLessonCompleted(pathSlug, lessonSlug);
  revalidatePath(`/learn/${pathSlug}`);
  revalidatePath(`/learn/${pathSlug}/${lessonSlug}`);
  revalidatePath("/learn");
}

export async function recordConceptSeenAction(conceptId: string) {
  await recordConceptSeen(conceptId, 0);
}

export async function submitQuizAction(input: {
  quizId: string;
  score: number;
  maxScore: number;
  passed: boolean;
  responses: Record<string, string>;
  pathSlug: string;
  lessonSlug: string;
}) {
  await recordQuizAttempt(input);
  revalidatePath(`/learn/${input.pathSlug}`);
  revalidatePath(`/learn/${input.pathSlug}/${input.lessonSlug}`);
  revalidatePath("/learn");
}

export async function runSqlAction(input: {
  sql: string;
  pathSlug: string;
  lessonSlug: string;
}) {
  if (!isLabConfigured()) {
    return {
      ok: false as const,
      postgresMessage: "Lab database is not configured",
      beginnerMessage:
        "SQL practice is unavailable because LAB_DATABASE_URL is not set.",
      hint: "Run scripts/lab/setup.sh and add LAB_DATABASE_URL for the querypilot_learner role.",
    };
  }

  const userId = await ensureGuestUserId();
  return executeLearnerSql(input.sql, userId);
}

export async function checkSqlChallengeAction(input: {
  challengeId: string;
  sql: string;
  pathSlug: string;
  lessonSlug: string;
}) {
  if (!isLabConfigured()) {
    return {
      passed: false,
      feedback:
        "SQL practice is unavailable because LAB_DATABASE_URL is not set.",
      hint: "Run scripts/lab/setup.sh and configure the restricted learner role.",
      learnerOutcome: {
        ok: false as const,
        postgresMessage: "Lab database is not configured",
        beginnerMessage: "Lab database is not configured",
      },
    };
  }

  const challenge = getSqlChallenge(input.challengeId);
  if (!challenge) {
    return {
      passed: false,
      feedback: "Unknown SQL challenge.",
      learnerOutcome: {
        ok: false as const,
        postgresMessage: "Unknown challenge",
        beginnerMessage: "Unknown SQL challenge.",
      },
    };
  }

  const userId = await ensureGuestUserId();
  const validation = await validateSqlChallenge(challenge, input.sql, userId);

  await recordExerciseAttempt({
    exerciseId: challenge.id,
    pathSlug: input.pathSlug,
    lessonSlug: input.lessonSlug,
    submission: input.sql,
    passed: validation.passed,
    feedback: validation.feedback,
    resultPreview: validation.learnerOutcome.ok
      ? {
          columns: validation.learnerOutcome.result.columns,
          rowCount: validation.learnerOutcome.result.rowCount,
          rows: validation.learnerOutcome.result.rows.slice(0, 20),
        }
      : null,
    errorMessage: validation.learnerOutcome.ok
      ? undefined
      : validation.learnerOutcome.postgresMessage,
    durationMs: validation.learnerOutcome.ok
      ? validation.learnerOutcome.result.durationMs
      : undefined,
  });

  revalidatePath(`/learn/${input.pathSlug}`);
  revalidatePath(`/learn/${input.pathSlug}/${input.lessonSlug}`);

  return validation;
}
