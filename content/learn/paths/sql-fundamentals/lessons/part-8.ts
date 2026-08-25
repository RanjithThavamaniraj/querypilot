import type { LessonDefinition } from "@/lib/learn/types";

export const subqueriesLesson: LessonDefinition = {
  slug: "subqueries",
  title: "Subqueries",
  summary: "Nest a query inside another to compare against computed results.",
  estimatedMinutes: 12,
  sortOrder: 43,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "A subquery is a SELECT inside another statement. Scalar subqueries return one value. IN subqueries return a list.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Compare to an average",
      code: "SELECT name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products);",
    },
    {
      type: "code",
      language: "sql",
      caption: "Membership with IN",
      code: "SELECT name\nFROM customers\nWHERE id IN (SELECT customer_id FROM orders);",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Products above average",
      initialSQL:
        "SELECT name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products)\nORDER BY price DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "products-above-average-price",
    },
    {
      type: "sql-challenge",
      challengeId: "customers-who-placed-orders",
    },
    {
      type: "sql-challenge",
      challengeId: "highest-priced-product",
    },
  ],
};

export const existsAndCorrelated: LessonDefinition = {
  slug: "exists-and-correlated",
  title: "EXISTS and Correlated Subqueries",
  summary: "Test for related rows with EXISTS / NOT EXISTS.",
  estimatedMinutes: 12,
  sortOrder: 44,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "A correlated subquery refers to the outer row. EXISTS asks “is there any match?” and stops when it finds one.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT name\nFROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);",
    },
    {
      type: "code",
      language: "sql",
      caption: "No related rows",
      code: "SELECT name\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);",
    },
    {
      type: "sql-playground",
      title: "EXISTS practice",
      initialSQL:
        "SELECT name\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customers-who-never-ordered",
    },
    {
      type: "sql-challenge",
      challengeId: "exists-customers-with-orders",
    },
    {
      type: "sql-challenge",
      challengeId: "not-exists-no-orders",
    },
  ],
};

export const joinsVsSubqueries: LessonDefinition = {
  slug: "joins-vs-subqueries",
  title: "Joins vs Subqueries",
  summary: "Choose the shape that reads clearest for the question.",
  estimatedMinutes: 10,
  sortOrder: 45,
  conceptIds: [],
  blocks: [
    {
      type: "list",
      items: [
        "Prefer JOINs when you need columns from multiple tables in the result",
        "Prefer EXISTS / IN when you only need to test presence",
        "Scalar subqueries shine for “compared to the average / max” questions",
        "Both are valid—clarity beats dogma",
      ],
    },
    {
      type: "example",
      title: "Same idea, two shapes",
      body: "Customers with orders can be written as INNER JOIN (then DISTINCT) or WHERE EXISTS. EXISTS often reads closer to the English question.",
    },
    {
      type: "sql-playground",
      title: "Rewrite with EXISTS",
      initialSQL:
        "SELECT DISTINCT c.name\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nORDER BY c.name;",
      datasetId: "shop",
    },
  ],
};

export const subqueriesCheckpointLesson: LessonDefinition = {
  slug: "subqueries-checkpoint",
  title: "Subqueries Checkpoint",
  summary: "Confirm scalar subqueries, IN, and EXISTS.",
  estimatedMinutes: 16,
  sortOrder: 46,
  conceptIds: [],
  quizId: "subqueries-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "Check that you can nest queries and explain when EXISTS helps.",
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Pass with 7/10. You can retry.",
    },
  ],
};
