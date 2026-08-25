import type { LessonDefinition } from "@/lib/learn/types";

export const ctesLesson: LessonDefinition = {
  slug: "ctes",
  title: "CTEs with WITH",
  summary: "Name intermediate results so complex SQL stays readable.",
  estimatedMinutes: 11,
  sortOrder: 47,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "A CTE (common table expression) is a named temporary result defined with WITH. Use it when a subquery would nest too deeply.",
    },
    {
      type: "code",
      language: "sql",
      code: "WITH expensive AS (\n  SELECT * FROM products WHERE price >= 100\n)\nSELECT name, price\nFROM expensive\nORDER BY price DESC;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Write a CTE",
      initialSQL:
        "WITH expensive AS (\n  SELECT * FROM products WHERE price >= 100\n)\nSELECT name, price\nFROM expensive\nORDER BY price DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "cte-expensive-products",
    },
  ],
};

export const composingCtes: LessonDefinition = {
  slug: "composing-ctes",
  title: "Composing CTEs",
  summary: "Chain CTEs with aggregation and joins.",
  estimatedMinutes: 12,
  sortOrder: 48,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "You can define several CTEs separated by commas. Aggregate in one step, then join in the next.",
    },
    {
      type: "code",
      language: "sql",
      code: "WITH order_counts AS (\n  SELECT customer_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT c.name, oc.order_count\nFROM customers c\nJOIN order_counts oc ON oc.customer_id = c.id;",
    },
    {
      type: "sql-playground",
      title: "CTE + join",
      initialSQL:
        "WITH india_customers AS (\n  SELECT * FROM customers WHERE country = 'India'\n)\nSELECT ic.name, o.id AS order_id\nFROM india_customers ic\nJOIN orders o ON o.customer_id = ic.id\nORDER BY ic.name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "cte-customer-order-counts",
    },
    {
      type: "sql-challenge",
      challengeId: "cte-join-filtered",
    },
  ],
};

export const recursiveCtes: LessonDefinition = {
  slug: "recursive-ctes",
  title: "Recursive CTEs (Introduction)",
  summary: "A short introduction to WITH RECURSIVE—enough to recognize the pattern.",
  estimatedMinutes: 10,
  sortOrder: 49,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Recursive CTEs repeat a step. Start with an anchor row, UNION ALL the next step, and stop with a WHERE condition. This is an introduction only—you will not need deep recursion for most app SQL.",
    },
    {
      type: "code",
      language: "sql",
      code: "WITH RECURSIVE n AS (\n  SELECT 1 AS value\n  UNION ALL\n  SELECT value + 1 FROM n WHERE value < 5\n)\nSELECT value FROM n;",
    },
    {
      type: "callout",
      tone: "note",
      text: "Hierarchy walks (org charts, category trees) use the same idea. Later phases go deeper; here, recognize the pattern.",
    },
    {
      type: "sql-playground",
      title: "Generate 1–5",
      initialSQL:
        "WITH RECURSIVE n AS (\n  SELECT 1 AS value\n  UNION ALL\n  SELECT value + 1 FROM n WHERE value < 5\n)\nSELECT value FROM n ORDER BY value;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "recursive-countdown",
    },
  ],
};

export const ctesCheckpointLesson: LessonDefinition = {
  slug: "ctes-checkpoint",
  title: "CTEs Checkpoint",
  summary: "Confirm WITH, composition, and basic recursion awareness.",
  estimatedMinutes: 14,
  sortOrder: 50,
  conceptIds: [],
  quizId: "ctes-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "CTEs are mostly about structure and readability.",
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
