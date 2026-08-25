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
import {
  ascAndDesc,
  limitLesson,
  offsetLesson,
  orderByLesson,
  sortingCommonMistakes,
  sortingLimitingCheckpointLesson,
  sortingMultipleColumns,
  sortingPatterns,
  whereOrderBy,
  whereOrderLimit,
} from "./lessons/part-3";
import type { PathDefinition } from "@/lib/learn/types";

export const sqlFundamentalsPath: PathDefinition = {
  slug: "sql-fundamentals",
  title: "SQL Fundamentals",
  description:
    "Learn SQL by writing and running real queries against a PostgreSQL practice database—from SELECT and filtering through sorting and limiting.",
  levelLabel: "Level 1",
  modules: [
    {
      slug: "sql-basics",
      title: "SQL Basics",
      description:
        "SELECT, filtering, ORDER BY, LIMIT/OFFSET, and practical challenges—with a live SQL editor against the shop dataset.",
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
        orderByLesson,
        ascAndDesc,
        sortingMultipleColumns,
        limitLesson,
        offsetLesson,
        whereOrderBy,
        whereOrderLimit,
        sortingPatterns,
        sortingCommonMistakes,
        sortingLimitingCheckpointLesson,
      ],
    },
  ],
};
