import { architectureConcepts, getConcept } from "@/content/learn/architecture/concepts";
import { getDiagram } from "@/content/learn/architecture/diagrams";
import { objectHierarchyExercise } from "@/content/learn/paths/foundations/exercises/map-object-hierarchy";
import { foundationsPath } from "@/content/learn/paths/foundations/path";
import { architectureBeginnerCheckpoint } from "@/content/learn/paths/foundations/quizzes/architecture-beginner-checkpoint";
import { sqlChallenges } from "@/content/learn/paths/sql-fundamentals/exercises/sql-challenges";
import { sqlFundamentalsPath } from "@/content/learn/paths/sql-fundamentals/path";
import { sqlBasicsCheckpoint } from "@/content/learn/paths/sql-fundamentals/quizzes/sql-basics-checkpoint";
import type {
  ExerciseDefinition,
  LessonDefinition,
  PathDefinition,
  QuizDefinition,
  SqlChallengeDefinition,
} from "@/lib/learn/types";

const paths: PathDefinition[] = [foundationsPath, sqlFundamentalsPath];

const exercises: Record<string, ExerciseDefinition> = {
  [objectHierarchyExercise.id]: objectHierarchyExercise,
};

const sqlChallengeMap: Record<string, SqlChallengeDefinition> = Object.fromEntries(
  sqlChallenges.map((challenge) => [challenge.id, challenge])
);

const quizzes: Record<string, QuizDefinition> = {
  [architectureBeginnerCheckpoint.id]: architectureBeginnerCheckpoint,
  [sqlBasicsCheckpoint.id]: sqlBasicsCheckpoint,
};

export function listPaths() {
  return paths;
}

export function getPath(slug: string) {
  return paths.find((path) => path.slug === slug) ?? null;
}

export function getPathLessons(pathSlug: string): LessonDefinition[] {
  const path = getPath(pathSlug);
  if (!path) return [];
  return path.modules.flatMap((module) => module.lessons);
}

export function getLesson(pathSlug: string, lessonSlug: string) {
  return (
    getPathLessons(pathSlug).find((lesson) => lesson.slug === lessonSlug) ?? null
  );
}

export function getAdjacentLessons(pathSlug: string, lessonSlug: string) {
  const lessons = getPathLessons(pathSlug);
  const index = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (index < 0) {
    return { previous: null, next: null, index: -1, total: lessons.length };
  }
  return {
    previous: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
    index,
    total: lessons.length,
  };
}

export function getExercise(id: string) {
  return exercises[id] ?? null;
}

export function getSqlChallenge(id: string) {
  return sqlChallengeMap[id] ?? null;
}

export function getQuiz(id: string) {
  return quizzes[id] ?? null;
}

export function getPathCheckpoints(pathSlug: string) {
  return getPathLessons(pathSlug).flatMap((lesson) => {
    if (!lesson.quizId) return [];
    const quiz = getQuiz(lesson.quizId);
    return [
      {
        quizId: lesson.quizId,
        title: (quiz?.title ?? lesson.title).replace(/\s+Checkpoint$/i, ""),
        maxScore: quiz?.questions.length ?? 10,
      },
    ];
  });
}

export function getPathCheckpointQuizId(pathSlug: string) {
  const checkpoints = getPathCheckpoints(pathSlug);
  return checkpoints[checkpoints.length - 1]?.quizId ?? null;
}

export function getArchitectureConcept(id: string) {
  return getConcept(id) ?? null;
}

export function listArchitectureConcepts() {
  return architectureConcepts;
}

export { getDiagram };
