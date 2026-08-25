import type { LessonDefinition } from "@/lib/learn/types";

export const windowFunctionsLesson: LessonDefinition = {
  slug: "window-functions",
  title: "Window Functions",
  summary: "Add calculations across related rows without collapsing the result.",
  estimatedMinutes: 12,
  sortOrder: 51,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "GROUP BY reduces rows. Window functions keep every row and add a calculated column using OVER(). That difference is essential.",
    },
    {
      type: "example",
      title: "GROUP BY vs window",
      body: "GROUP BY category with AVG(price) returns one row per category. AVG(price) OVER (PARTITION BY category) returns every product plus the category average beside it.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT name, category, price,\n       AVG(price) OVER (PARTITION BY category) AS category_avg\nFROM products;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Keep rows, add a window",
      initialSQL:
        "SELECT name, category, price,\n       ROUND(AVG(price) OVER (PARTITION BY category), 2) AS category_avg\nFROM products\nORDER BY category, price DESC;",
      datasetId: "shop",
    },
  ],
};

export const rankingWindows: LessonDefinition = {
  slug: "ranking-windows",
  title: "ROW_NUMBER, RANK, and DENSE_RANK",
  summary: "Number and rank rows with and without partitions.",
  estimatedMinutes: 12,
  sortOrder: 52,
  conceptIds: [],
  blocks: [
    {
      type: "list",
      items: [
        "ROW_NUMBER — unique positions even when values tie",
        "RANK — ties share a rank; next ranks skip",
        "DENSE_RANK — ties share a rank; no gaps",
        "PARTITION BY — restart numbering inside each group",
      ],
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT name, price,\n       RANK() OVER (ORDER BY price DESC) AS price_rank\nFROM products;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Rank inside each category",
      code: "SELECT name, category, price,\n       RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank\nFROM products;",
    },
    {
      type: "sql-playground",
      title: "Rank products",
      initialSQL:
        "SELECT name, category, price,\n       RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank\nFROM products\nORDER BY category, category_rank;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "rank-products-by-price",
    },
    {
      type: "sql-challenge",
      challengeId: "rank-products-within-category",
    },
    {
      type: "sql-challenge",
      challengeId: "top-product-per-category",
    },
    {
      type: "sql-challenge",
      challengeId: "product-row-numbers",
    },
  ],
};

export const lagLeadRunning: LessonDefinition = {
  slug: "lag-lead-running-totals",
  title: "LAG, LEAD, and Running Totals",
  summary: "Look at neighboring rows and accumulate values across an ordered window.",
  estimatedMinutes: 12,
  sortOrder: 53,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "LAG reads the previous row. LEAD reads the next. Ordered window aggregates like SUM(...) OVER (ORDER BY ...) build running totals.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT name, price,\n       LAG(price) OVER (ORDER BY price) AS previous_price\nFROM products;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Running total",
      code: "SELECT id, quantity,\n       SUM(quantity) OVER (ORDER BY ordered_at, id) AS running_qty\nFROM orders;",
    },
    {
      type: "sql-playground",
      title: "Running totals",
      initialSQL:
        "SELECT id, ordered_at, quantity,\n       SUM(quantity) OVER (ORDER BY ordered_at, id) AS running_qty\nFROM orders\nORDER BY ordered_at, id;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "lag-previous-price",
    },
    {
      type: "sql-challenge",
      challengeId: "running-total-quantities",
    },
  ],
};

export const windowFunctionsCheckpointLesson: LessonDefinition = {
  slug: "window-functions-checkpoint",
  title: "Window Functions Checkpoint",
  summary: "Confirm OVER, ranking, partitions, and running calculations.",
  estimatedMinutes: 16,
  sortOrder: 54,
  conceptIds: [],
  quizId: "window-functions-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "Remember: windows keep rows; GROUP BY collapses them.",
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
