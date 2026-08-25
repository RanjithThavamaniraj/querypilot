CREATE TABLE "exercise_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"exercise_id" text NOT NULL,
	"path_slug" text NOT NULL,
	"lesson_slug" text NOT NULL,
	"submission" text NOT NULL,
	"passed" boolean NOT NULL,
	"feedback" text,
	"result_preview" jsonb,
	"error_message" text,
	"duration_ms" integer,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD CONSTRAINT "exercise_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;