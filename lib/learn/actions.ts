"use server";

import { revalidatePath } from "next/cache";

import {
  ensureGuestUserId,
  getGuestUserIdOrNull,
  markLessonCompleted,
  markLessonStarted,
  recordConceptSeen,
  recordQuizAttempt,
} from "@/lib/learn/progress";

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
