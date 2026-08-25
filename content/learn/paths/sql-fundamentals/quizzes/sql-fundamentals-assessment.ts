import type { QuizDefinition } from "@/lib/learn/types";

export const sqlFundamentalsAssessment: QuizDefinition = {
  id: "sql-fundamentals-assessment",
  title: "SQL Fundamentals Assessment",
  description:
    "Concept check across SELECT, DML, transactions, functions, aggregation, joins, subqueries, CTEs, and windows.",
  passScore: 8,
  questions: [
    {
      id: "q1",
      prompt: "ORDER BY is required for a meaningful top-N LIMIT because:",
      options: [
        { id: "a", label: "LIMIT alone does not define which rows are “top”" },
        { id: "b", label: "LIMIT deletes indexes" },
        { id: "c", label: "ORDER BY disables WHERE" },
        { id: "d", label: "PostgreSQL forbids LIMIT" },
      ],
      correctOptionId: "a",
      explanation: "ORDER BY ranks rows; LIMIT keeps the first N of that ranking.",
    },
    {
      id: "q2",
      prompt: "UPDATE/DELETE without WHERE:",
      options: [
        { id: "a", label: "Can change or remove every row" },
        { id: "b", label: "Always fails" },
        { id: "c", label: "Only updates one random row" },
        { id: "d", label: "Creates a backup automatically" },
      ],
      correctOptionId: "a",
      explanation: "Unscoped writes are dangerous.",
    },
    {
      id: "q3",
      prompt: "ROLLBACK:",
      options: [
        { id: "a", label: "Discards the current transaction’s changes" },
        { id: "b", label: "Creates a role" },
        { id: "c", label: "Builds an index" },
        { id: "d", label: "Starts replication" },
      ],
      correctOptionId: "a",
      explanation: "ROLLBACK undoes uncommitted work.",
    },
    {
      id: "q4",
      prompt: "NULL is:",
      options: [
        { id: "a", label: "Unknown/missing—not the same as ''" },
        { id: "b", label: "Always equal to 0" },
        { id: "c", label: "Always equal to false" },
        { id: "d", label: "A primary key" },
      ],
      correctOptionId: "a",
      explanation: "NULL means missing information.",
    },
    {
      id: "q5",
      prompt: "HAVING filters:",
      options: [
        { id: "a", label: "Groups after aggregation" },
        { id: "b", label: "Rows before FROM" },
        { id: "c", label: "Only indexes" },
        { id: "d", label: "Only schemas" },
      ],
      correctOptionId: "a",
      explanation: "WHERE is pre-group; HAVING is post-group.",
    },
    {
      id: "q6",
      prompt: "INNER JOIN keeps:",
      options: [
        { id: "a", label: "Matching rows from both sides" },
        { id: "b", label: "All left rows with NULLs for misses" },
        { id: "c", label: "Only unmatched rows" },
        { id: "d", label: "Cartesian products only" },
      ],
      correctOptionId: "a",
      explanation: "Inner joins require matches.",
    },
    {
      id: "q7",
      prompt: "LEFT JOIN + WHERE right.id IS NULL finds:",
      options: [
        { id: "a", label: "Left rows with no match" },
        { id: "b", label: "Only duplicates" },
        { id: "c", label: "Only maximum prices" },
        { id: "d", label: "Disconnected databases" },
      ],
      correctOptionId: "a",
      explanation: "That pattern finds unmatched left rows.",
    },
    {
      id: "q8",
      prompt: "EXISTS checks:",
      options: [
        { id: "a", label: "Whether a subquery finds any row" },
        { id: "b", label: "Disk encryption" },
        { id: "c", label: "CSS validity" },
        { id: "d", label: "Git status" },
      ],
      correctOptionId: "a",
      explanation: "EXISTS is a presence test.",
    },
    {
      id: "q9",
      prompt: "WITH names a:",
      options: [
        { id: "a", label: "CTE / intermediate result" },
        { id: "b", label: "Tablespace only" },
        { id: "c", label: "Replication slot only" },
        { id: "d", label: "Linux package" },
      ],
      correctOptionId: "a",
      explanation: "WITH introduces common table expressions.",
    },
    {
      id: "q10",
      prompt: "Window functions vs GROUP BY:",
      options: [
        { id: "a", label: "Windows keep rows; GROUP BY collapses them" },
        { id: "b", label: "They are identical" },
        { id: "c", label: "Windows delete tables" },
        { id: "d", label: "GROUP BY requires OVER()" },
      ],
      correctOptionId: "a",
      explanation: "That distinction is fundamental.",
    },
    {
      id: "q11",
      prompt: "CASE expressions are used to:",
      options: [
        { id: "a", label: "Label or compute values conditionally per row" },
        { id: "b", label: "Create clusters" },
        { id: "c", label: "Grant superuser" },
        { id: "d", label: "Start autovacuum" },
      ],
      correctOptionId: "a",
      explanation: "CASE is conditional logic in SQL expressions.",
    },
    {
      id: "q12",
      prompt: "In QueryPilot, learner SQL runs against:",
      options: [
        {
          id: "a",
          label: "The lab database via a restricted learner role (writes sandboxed)",
        },
        { id: "b", label: "The application database as superuser" },
        { id: "c", label: "A random public internet database" },
        { id: "d", label: "No database at all" },
      ],
      correctOptionId: "a",
      explanation:
        "Lab practice stays isolated from the app DB; writes use a private copy.",
    },
  ],
};
