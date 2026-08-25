import type { QuizDefinition } from "@/lib/learn/types";

export const sqlBasicsCheckpoint: QuizDefinition = {
  id: "sql-basics-checkpoint",
  title: "SQL Basics Checkpoint",
  description:
    "Confirm you can read SELECT queries, filter with WHERE, and combine conditions.",
  passScore: 7,
  questions: [
    {
      id: "q1",
      prompt: "What does SQL primarily let you do?",
      options: [
        { id: "a", label: "Design CSS layouts" },
        { id: "b", label: "Ask a relational database to read or change data" },
        { id: "c", label: "Compile C programs" },
        { id: "d", label: "Configure DNS" },
      ],
      correctOptionId: "b",
      explanation:
        "SQL is the language you use to query and modify data in relational databases like PostgreSQL.",
    },
    {
      id: "q2",
      prompt: "Which clause chooses which table to read?",
      options: [
        { id: "a", label: "SELECT" },
        { id: "b", label: "FROM" },
        { id: "c", label: "WHERE" },
        { id: "d", label: "DISTINCT" },
      ],
      correctOptionId: "b",
      explanation: "FROM names the table (or tables) the query reads.",
    },
    {
      id: "q3",
      prompt: "What does SELECT * mean?",
      options: [
        { id: "a", label: "Select no columns" },
        { id: "b", label: "Select every column from the source" },
        { id: "c", label: "Delete every row" },
        { id: "d", label: "Create a new table" },
      ],
      correctOptionId: "b",
      explanation: "The asterisk is a shortcut for all columns.",
    },
    {
      id: "q4",
      prompt: "Which query returns only customer names?",
      options: [
        { id: "a", label: "SELECT * FROM customers;" },
        { id: "b", label: "SELECT name FROM customers;" },
        { id: "c", label: "FROM customers SELECT;" },
        { id: "d", label: "SELECT customers;" },
      ],
      correctOptionId: "b",
      explanation: "List the columns you want after SELECT.",
    },
    {
      id: "q5",
      prompt: "Why do we write country = 'India' with quotes?",
      options: [
        { id: "a", label: "Because India is a number" },
        { id: "b", label: "Because text values are written as string literals" },
        { id: "c", label: "Because WHERE forbids numbers" },
        { id: "d", label: "Because PostgreSQL ignores quotes" },
      ],
      correctOptionId: "b",
      explanation: "Text comparisons use single-quoted string literals.",
    },
    {
      id: "q6",
      prompt: "What does DISTINCT do?",
      options: [
        { id: "a", label: "Sorts rows alphabetically" },
        { id: "b", label: "Removes duplicate values from the result" },
        { id: "c", label: "Joins two tables" },
        { id: "d", label: "Creates an index" },
      ],
      correctOptionId: "b",
      explanation: "DISTINCT keeps unique combinations of the selected expressions.",
    },
    {
      id: "q7",
      prompt: "WHERE country = 'India' AND name = 'Priya Sharma' returns a row only when:",
      options: [
        { id: "a", label: "Either condition is true" },
        { id: "b", label: "Both conditions are true" },
        { id: "c", label: "Neither condition is true" },
        { id: "d", label: "The table is empty" },
      ],
      correctOptionId: "b",
      explanation: "AND requires every condition to be true for a row to match.",
    },
    {
      id: "q8",
      prompt: "Which operator means “not equal” in SQL?",
      options: [
        { id: "a", label: "=" },
        { id: "b", label: "<> or !=" },
        { id: "c", label: "AND" },
        { id: "d", label: "FROM" },
      ],
      correctOptionId: "b",
      explanation: "PostgreSQL accepts <> and != for inequality.",
    },
    {
      id: "q9",
      prompt: "An alias like SELECT name AS customer_name:",
      options: [
        { id: "a", label: "Renames the column in the result label" },
        { id: "b", label: "Deletes the original column" },
        { id: "c", label: "Creates a new table permanently" },
        { id: "d", label: "Changes the stored data on disk" },
      ],
      correctOptionId: "a",
      explanation: "Aliases rename expressions in the output without changing stored data.",
    },
    {
      id: "q10",
      prompt: "When you click Run in QueryPilot, what happens first inside PostgreSQL?",
      options: [
        { id: "a", label: "The query is parsed and then processed through the query flow" },
        { id: "b", label: "Rows are emailed to the client" },
        { id: "c", label: "PostgreSQL rewrites your CSS" },
        { id: "d", label: "The database is deleted" },
      ],
      correctOptionId: "a",
      explanation:
        "SQL is parsed, planned, and executed—then results return. That is the query-flow map from Foundations.",
    },
  ],
};
