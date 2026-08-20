import { and, desc, eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/lib/db";
import {
  conceptProgress,
  lessonProgress,
  quizAttempts,
  users,
} from "@/lib/db/schema";
import { getPathLessons } from "@/lib/learn/content";
import type {
  LearnerProgressSnapshot,
  LessonProgressStatus,
} from "@/lib/learn/types";

export const LEARNER_COOKIE = "qp_learner_id";

function emptyProgress(pathSlug: string): LearnerProgressSnapshot {
  const lessons = getPathLessons(pathSlug);
  const lessonStatuses: Record<string, LessonProgressStatus> = {};
  for (const lesson of lessons) {
    lessonStatuses[lesson.slug] = "not_started";
  }

  return {
    lessonStatuses,
    completedLessonCount: 0,
    totalLessonCount: lessons.length,
    completionPercent: 0,
    continueLessonSlug: lessons[0]?.slug ?? null,
    bestQuizScore: null,
    quizPassed: false,
    conceptsSeen: [],
  };
}

export async function getGuestUserIdOrNull() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(LEARNER_COOKIE)?.value;
  if (!existing) return null;

  const [found] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, existing))
    .limit(1);

  return found?.id ?? null;
}

/** Must only be called from a Server Action or Route Handler (sets cookies). */
export async function ensureGuestUserId() {
  const existing = await getGuestUserIdOrNull();
  if (existing) return existing;

  const cookieStore = await cookies();
  const [created] = await db
    .insert(users)
    .values({ kind: "guest" })
    .returning({ id: users.id });

  cookieStore.set(LEARNER_COOKIE, created.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return created.id;
}

export async function getLearnerProgress(
  pathSlug: string
): Promise<LearnerProgressSnapshot> {
  const userId = await getGuestUserIdOrNull();
  if (!userId) {
    return emptyProgress(pathSlug);
  }

  const lessons = getPathLessons(pathSlug);

  const rows = await db
    .select()
    .from(lessonProgress)
    .where(
      and(eq(lessonProgress.userId, userId), eq(lessonProgress.pathSlug, pathSlug))
    );

  const lessonStatuses: Record<string, LessonProgressStatus> = {};
  for (const lesson of lessons) {
    lessonStatuses[lesson.slug] = "not_started";
  }
  for (const row of rows) {
    lessonStatuses[row.lessonSlug] = row.status as LessonProgressStatus;
  }

  const completedLessonCount = Object.values(lessonStatuses).filter(
    (status) => status === "completed"
  ).length;
  const totalLessonCount = lessons.length;
  const completionPercent =
    totalLessonCount === 0
      ? 0
      : Math.round((completedLessonCount / totalLessonCount) * 100);

  const continueLesson =
    lessons.find((lesson) => lessonStatuses[lesson.slug] !== "completed") ?? null;

  const quizRows = await db
    .select()
    .from(quizAttempts)
    .where(
      and(
        eq(quizAttempts.userId, userId),
        eq(quizAttempts.quizId, "architecture-beginner-checkpoint")
      )
    )
    .orderBy(desc(quizAttempts.submittedAt));

  const bestQuizScore =
    quizRows.length === 0
      ? null
      : Math.max(...quizRows.map((row) => row.score));
  const quizPassed = quizRows.some((row) => row.passed);

  const conceptRows = await db
    .select()
    .from(conceptProgress)
    .where(eq(conceptProgress.userId, userId));

  return {
    lessonStatuses,
    completedLessonCount,
    totalLessonCount,
    completionPercent,
    continueLessonSlug: continueLesson?.slug ?? null,
    bestQuizScore,
    quizPassed,
    conceptsSeen: conceptRows.map((row) => row.conceptId),
  };
}

export async function markLessonStarted(pathSlug: string, lessonSlug: string) {
  const userId = await ensureGuestUserId();
  const now = new Date();

  await db
    .insert(lessonProgress)
    .values({
      userId,
      pathSlug,
      lessonSlug,
      status: "in_progress",
      startedAt: now,
      lastSeenAt: now,
    })
    .onConflictDoUpdate({
      target: [
        lessonProgress.userId,
        lessonProgress.pathSlug,
        lessonProgress.lessonSlug,
      ],
      set: {
        lastSeenAt: now,
        status: sql`case when ${lessonProgress.status} = 'completed' then ${lessonProgress.status} else 'in_progress' end`,
        startedAt: sql`coalesce(${lessonProgress.startedAt}, now())`,
      },
    });
}

export async function markLessonCompleted(pathSlug: string, lessonSlug: string) {
  const userId = await ensureGuestUserId();
  const now = new Date();

  await db
    .insert(lessonProgress)
    .values({
      userId,
      pathSlug,
      lessonSlug,
      status: "completed",
      startedAt: now,
      completedAt: now,
      lastSeenAt: now,
    })
    .onConflictDoUpdate({
      target: [
        lessonProgress.userId,
        lessonProgress.pathSlug,
        lessonProgress.lessonSlug,
      ],
      set: {
        status: "completed",
        completedAt: now,
        lastSeenAt: now,
        startedAt: sql`coalesce(${lessonProgress.startedAt}, now())`,
      },
    });
}

export async function recordConceptSeen(conceptId: string, layer = 0) {
  const userId = await ensureGuestUserId();
  const now = new Date();

  await db
    .insert(conceptProgress)
    .values({
      userId,
      conceptId,
      highestLayerSeen: layer,
      firstSeenAt: now,
      lastSeenAt: now,
    })
    .onConflictDoUpdate({
      target: [conceptProgress.userId, conceptProgress.conceptId],
      set: {
        lastSeenAt: now,
        highestLayerSeen: sql`greatest(${conceptProgress.highestLayerSeen}, ${layer})`,
      },
    });
}

export async function recordQuizAttempt(input: {
  quizId: string;
  score: number;
  maxScore: number;
  passed: boolean;
  responses: Record<string, string>;
  pathSlug: string;
  lessonSlug: string;
}) {
  const userId = await ensureGuestUserId();

  await db.insert(quizAttempts).values({
    userId,
    quizId: input.quizId,
    score: input.score,
    maxScore: input.maxScore,
    passed: input.passed,
    responses: input.responses,
  });

  if (input.passed) {
    await markLessonCompleted(input.pathSlug, input.lessonSlug);
  } else {
    await markLessonStarted(input.pathSlug, input.lessonSlug);
  }
}
