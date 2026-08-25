import type { LessonDefinition } from "@/lib/learn/types";

export const sqlFundamentalsAssessmentLesson: LessonDefinition = {
  slug: "sql-fundamentals-assessment",
  title: "SQL Fundamentals Assessment",
  summary:
    "Prove Phase 2 skills with concept questions and real SQL challenges across the full fundamentals map.",
  estimatedMinutes: 45,
  sortOrder: 55,
  conceptIds: ["query-flow"],
  quizId: "sql-fundamentals-assessment",
  blocks: [
    {
      type: "paragraph",
      text: "This final assessment mixes a 12-question concept quiz with practical SQL challenges. Pass the quiz (8/12). Use the challenges to show you can write SQL, not just recognize it.",
    },
    {
      type: "heading",
      text: "What you should be able to do",
    },
    {
      type: "list",
      items: [
        "SELECT, filter, sort, and limit results",
        "Modify data safely and explain transactions",
        "Use expressions, CASE, and NULL handling",
        "Aggregate with GROUP BY and HAVING",
        "JOIN multiple tables and find unmatched rows",
        "Write subqueries, CTEs, and basic window functions",
      ],
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "heading",
      text: "Practical SQL challenges",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Attempt each challenge. Feedback and attempts are saved. Easy → medium → advanced-beginner.",
    },
    { type: "sql-challenge", challengeId: "final-select-filter-sort" },
    { type: "sql-challenge", challengeId: "final-top-n" },
    { type: "sql-challenge", challengeId: "final-case-classify" },
    { type: "sql-challenge", challengeId: "final-group-having" },
    { type: "sql-challenge", challengeId: "final-inner-join" },
    { type: "sql-challenge", challengeId: "final-left-join-no-orders" },
    { type: "sql-challenge", challengeId: "final-subquery-avg" },
    { type: "sql-challenge", challengeId: "final-cte" },
    { type: "sql-challenge", challengeId: "final-window-rank" },
    {
      type: "heading",
      text: "Concept quiz",
    },
    {
      type: "paragraph",
      text: "Complete the quiz below. Passing marks this assessment lesson complete. You can retry.",
    },
  ],
};
