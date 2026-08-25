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
import {
  deleteLesson,
  insertLesson,
  safeDataChanges,
  transactionsLesson,
  updateLesson,
  workingWithDataCheckpointLesson,
} from "./lessons/part-4";
import {
  caseExpressions,
  expressionsLesson,
  functionsCheckpointLesson,
  nullAndCoalesce,
  sqlFunctionsLesson,
} from "./lessons/part-5";
import {
  aggregateFunctions,
  aggregationCheckpointLesson,
  groupByLesson,
  havingLesson,
} from "./lessons/part-6";
import {
  innerJoinLesson,
  joiningMultipleTables,
  joinMistakes,
  joinsCheckpointLesson,
  leftJoinLesson,
  otherJoins,
  whyJoins,
} from "./lessons/part-7";
import {
  existsAndCorrelated,
  joinsVsSubqueries,
  subqueriesCheckpointLesson,
  subqueriesLesson,
} from "./lessons/part-8";
import {
  composingCtes,
  ctesCheckpointLesson,
  ctesLesson,
  recursiveCtes,
} from "./lessons/part-9";
import {
  lagLeadRunning,
  rankingWindows,
  windowFunctionsCheckpointLesson,
  windowFunctionsLesson,
} from "./lessons/part-10";
import { sqlFundamentalsAssessmentLesson } from "./lessons/part-11";
import type { PathDefinition } from "@/lib/learn/types";

export const sqlFundamentalsPath: PathDefinition = {
  slug: "sql-fundamentals",
  title: "SQL Fundamentals",
  description:
    "Learn practical SQL against a live PostgreSQL shop dataset—from SELECT through joins, subqueries, CTEs, window functions, and a final assessment.",
  levelLabel: "Level 1",
  modules: [
    {
      slug: "sql-basics",
      title: "Lessons",
      description:
        "SELECT, filtering, sorting, data changes, functions, aggregation, joins, subqueries, CTEs, and window functions—with a live SQL editor.",
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
        insertLesson,
        updateLesson,
        deleteLesson,
        transactionsLesson,
        safeDataChanges,
        workingWithDataCheckpointLesson,
        expressionsLesson,
        sqlFunctionsLesson,
        caseExpressions,
        nullAndCoalesce,
        functionsCheckpointLesson,
        aggregateFunctions,
        groupByLesson,
        havingLesson,
        aggregationCheckpointLesson,
        whyJoins,
        innerJoinLesson,
        leftJoinLesson,
        otherJoins,
        joiningMultipleTables,
        joinMistakes,
        joinsCheckpointLesson,
        subqueriesLesson,
        existsAndCorrelated,
        joinsVsSubqueries,
        subqueriesCheckpointLesson,
        ctesLesson,
        composingCtes,
        recursiveCtes,
        ctesCheckpointLesson,
        windowFunctionsLesson,
        rankingWindows,
        lagLeadRunning,
        windowFunctionsCheckpointLesson,
        sqlFundamentalsAssessmentLesson,
      ],
    },
  ],
};
