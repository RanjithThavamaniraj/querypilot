import {
  aliases,
  selectStar,
  selectingColumns,
  whatIsSql,
  yourFirstSelect,
} from "./lessons/part-1";
import {
  andOrNot,
  comparisonOperators,
  distinctLesson,
  sqlBasicsCheckpointLesson,
  whereLesson,
} from "./lessons/part-2";
import type { PathDefinition } from "@/lib/learn/types";

export const sqlFundamentalsPath: PathDefinition = {
  slug: "sql-fundamentals",
  title: "SQL Fundamentals",
  description:
    "Learn SQL by writing and running real SELECT queries against a PostgreSQL practice database.",
  levelLabel: "Level 1",
  modules: [
    {
      slug: "sql-basics",
      title: "SQL Basics",
      description:
        "SELECT, columns, DISTINCT, WHERE, comparisons, and logical operators—with a live SQL editor.",
      lessons: [
        whatIsSql,
        yourFirstSelect,
        selectingColumns,
        selectStar,
        aliases,
        distinctLesson,
        whereLesson,
        comparisonOperators,
        andOrNot,
        sqlBasicsCheckpointLesson,
      ],
    },
  ],
};
