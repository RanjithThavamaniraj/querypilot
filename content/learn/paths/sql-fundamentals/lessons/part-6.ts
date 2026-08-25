import type { LessonDefinition } from "@/lib/learn/types";

export const aggregateFunctions: LessonDefinition = {
  slug: "aggregate-functions",
  title: "Aggregate Functions",
  summary: "Summarize many rows with COUNT, SUM, AVG, MIN, and MAX.",
  estimatedMinutes: 11,
  sortOrder: 32,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "Aggregates collapse many rows into a summary. COUNT(*) counts rows. COUNT(column) ignores NULL in that column. SUM/AVG need numeric values. MIN/MAX find extremes.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT COUNT(*) AS customer_count FROM customers;\n\nSELECT ROUND(AVG(price), 2) AS avg_price,\n       MIN(price) AS min_price,\n       MAX(price) AS max_price\nFROM products;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Summarize the shop",
      initialSQL: "SELECT COUNT(*) AS order_count, SUM(quantity) AS total_quantity\nFROM orders;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "count-customers",
    },
    {
      type: "sql-challenge",
      challengeId: "count-orders",
    },
    {
      type: "sql-challenge",
      challengeId: "average-product-price",
    },
    {
      type: "sql-challenge",
      challengeId: "total-order-quantities",
    },
    {
      type: "sql-challenge",
      challengeId: "cheapest-product",
    },
  ],
};

export const groupByLesson: LessonDefinition = {
  slug: "group-by",
  title: "GROUP BY",
  summary: "Split rows into groups, then aggregate each group.",
  estimatedMinutes: 12,
  sortOrder: 33,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "GROUP BY category makes one result row per category. Aggregates then run inside each group. Non-aggregated columns in SELECT must appear in GROUP BY.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT category, COUNT(*) AS product_count\nFROM products\nGROUP BY category;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Multiple grouping columns",
      code: "SELECT country, COUNT(*) AS customer_count\nFROM customers\nGROUP BY country;",
    },
    {
      type: "sql-playground",
      title: "Group the data",
      initialSQL:
        "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nORDER BY order_count DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "orders-per-customer",
    },
    {
      type: "sql-challenge",
      challengeId: "products-per-category",
    },
    {
      type: "sql-challenge",
      challengeId: "india-customer-count",
    },
  ],
};

export const havingLesson: LessonDefinition = {
  slug: "having",
  title: "HAVING",
  summary: "Filter groups after aggregation—and know how that differs from WHERE.",
  estimatedMinutes: 12,
  sortOrder: 34,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "WHERE filters rows before grouping. HAVING filters groups after aggregation. You cannot put COUNT(*) in WHERE because the count does not exist yet.",
    },
    {
      type: "example",
      title: "WHERE vs HAVING",
      body: "WHERE category = 'Audio' keeps Audio rows, then you can aggregate them. HAVING COUNT(*) >= 3 keeps only categories that already have at least three products.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT category, COUNT(*) AS product_count\nFROM products\nGROUP BY category\nHAVING COUNT(*) >= 3;",
    },
    {
      type: "sql-playground",
      title: "Filter groups",
      initialSQL:
        "SELECT category, COUNT(*) AS product_count\nFROM products\nGROUP BY category\nHAVING COUNT(*) >= 3\nORDER BY product_count DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "categories-above-threshold",
    },
  ],
};

export const aggregationCheckpointLesson: LessonDefinition = {
  slug: "aggregation-checkpoint",
  title: "Aggregation Checkpoint",
  summary: "Confirm aggregates, GROUP BY, and HAVING.",
  estimatedMinutes: 16,
  sortOrder: 35,
  conceptIds: [],
  quizId: "aggregation-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "Make sure you can summarize data and explain WHERE vs HAVING.",
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
