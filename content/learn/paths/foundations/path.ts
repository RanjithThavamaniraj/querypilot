import {
  clusterDatabaseSchema,
  dbmsVsRdbms,
  tablesRowsColumns,
  whatIsADatabase,
  whatIsPostgresql,
} from "./lessons/part-1";
import {
  architectureBeginnerCheckpointLesson,
  architectureOverview,
  basicProcesses,
  clientAndServer,
  whatHappensWhenYouRunSql,
} from "./lessons/part-2";
import type { PathDefinition } from "@/lib/learn/types";

export const foundationsPath: PathDefinition = {
  slug: "foundations",
  title: "Foundations",
  description:
    "Start from absolute beginner concepts and build the PostgreSQL architecture map you will deepen for the rest of QueryPilot.",
  levelLabel: "Level 0",
  modules: [
    {
      slug: "database-postgresql-foundations",
      title: "Database & PostgreSQL Foundations",
      description:
        "Databases, PostgreSQL basics, object hierarchy, and a beginner architecture map—before SQL fundamentals.",
      lessons: [
        whatIsADatabase,
        whatIsPostgresql,
        dbmsVsRdbms,
        clusterDatabaseSchema,
        tablesRowsColumns,
        architectureOverview,
        whatHappensWhenYouRunSql,
        clientAndServer,
        basicProcesses,
        architectureBeginnerCheckpointLesson,
      ],
    },
  ],
};
