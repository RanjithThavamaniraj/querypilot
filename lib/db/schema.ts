import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  kind: text("kind").notNull().default("guest"),
  email: text("email"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    pathSlug: text("path_slug").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    status: text("status").notNull().default("not_started"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("lesson_progress_user_path_lesson").on(
      table.userId,
      table.pathSlug,
      table.lessonSlug
    ),
  ]
);

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quizId: text("quiz_id").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  passed: boolean("passed").notNull(),
  responses: jsonb("responses").notNull().$type<Record<string, string>>(),
  submittedAt: timestamp("submitted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const conceptProgress = pgTable(
  "concept_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    conceptId: text("concept_id").notNull(),
    highestLayerSeen: integer("highest_layer_seen").notNull().default(0),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("concept_progress_user_concept").on(table.userId, table.conceptId),
  ]
);

export const exerciseAttempts = pgTable("exercise_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").notNull(),
  pathSlug: text("path_slug").notNull(),
  lessonSlug: text("lesson_slug").notNull(),
  submission: text("submission").notNull(),
  passed: boolean("passed").notNull(),
  feedback: text("feedback"),
  resultPreview: jsonb("result_preview"),
  errorMessage: text("error_message"),
  durationMs: integer("duration_ms"),
  submittedAt: timestamp("submitted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
