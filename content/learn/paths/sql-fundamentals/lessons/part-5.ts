import type { LessonDefinition } from "@/lib/learn/types";

export const expressionsLesson: LessonDefinition = {
  slug: "expressions",
  title: "Expressions",
  summary: "Compute new values in SELECT with arithmetic and concatenation.",
  estimatedMinutes: 10,
  sortOrder: 27,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Expressions calculate values from columns. They do not permanently change the table unless you UPDATE.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Arithmetic",
      code: "SELECT name, price, price * 1.1 AS with_tax\nFROM products;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Concatenate text",
      code: "SELECT name || ' <' || email || '>' AS label\nFROM customers;",
    },
    {
      type: "sql-playground",
      title: "Build a derived column",
      initialSQL: "SELECT name, price, ROUND(price * 1.1, 2) AS tax_price\nFROM products;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "calculate-product-values",
    },
  ],
};

export const sqlFunctionsLesson: LessonDefinition = {
  slug: "sql-functions",
  title: "Common SQL Functions",
  summary: "Use everyday string, numeric, and date functions—not an encyclopedia.",
  estimatedMinutes: 12,
  sortOrder: 28,
  conceptIds: [],
  blocks: [
    {
      type: "list",
      items: [
        "UPPER / LOWER — normalize text for display or comparison",
        "LENGTH / TRIM — measure and clean strings",
        "ROUND — tidy numeric results",
        "CURRENT_DATE — today’s date on the server",
        "date + n — add days to a date",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "String helpers",
      code: "SELECT UPPER(name) AS name_upper,\n       LENGTH(name) AS name_length,\n       TRIM(phone) AS phone_trimmed\nFROM customers;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Dates",
      code: "SELECT id, ordered_at, ordered_at + 7 AS ship_by, CURRENT_DATE AS today\nFROM orders;",
    },
    {
      type: "sql-playground",
      title: "Try functions",
      initialSQL: "SELECT name, UPPER(name) AS name_upper, LENGTH(name) AS name_length\nFROM customers;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "format-customer-names",
    },
    {
      type: "sql-challenge",
      challengeId: "name-length",
    },
    {
      type: "sql-challenge",
      challengeId: "order-ship-dates",
    },
  ],
};

export const caseExpressions: LessonDefinition = {
  slug: "case-expressions",
  title: "CASE",
  summary: "Label rows with conditional logic inside SELECT.",
  estimatedMinutes: 10,
  sortOrder: 29,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "CASE is SQL’s if/else for expressions. Test WHEN clauses in order; the first match wins.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT name, price,\n  CASE\n    WHEN price < 50 THEN 'Budget'\n    WHEN price < 200 THEN 'Mid'\n    ELSE 'Premium'\n  END AS price_band\nFROM products;",
    },
    {
      type: "sql-playground",
      title: "Classify rows",
      initialSQL:
        "SELECT name, price,\n  CASE\n    WHEN price < 50 THEN 'Budget'\n    WHEN price < 200 THEN 'Mid'\n    ELSE 'Premium'\n  END AS price_band\nFROM products;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "classify-products-case",
    },
  ],
};

export const nullAndCoalesce: LessonDefinition = {
  slug: "null-and-coalesce",
  title: "NULL and COALESCE",
  summary: "Understand NULL, empty strings, and how COALESCE fills gaps.",
  estimatedMinutes: 11,
  sortOrder: 30,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "NULL means unknown / missing. It is not the same as '' (empty string). Comparisons with NULL need IS NULL / IS NOT NULL—not = NULL.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Find missing phones",
      code: "SELECT name, phone\nFROM customers\nWHERE phone IS NULL;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Replace NULL for display",
      code: "SELECT name, COALESCE(phone, 'No phone') AS phone_display\nFROM customers;",
    },
    {
      type: "example",
      title: "NULL vs empty string",
      body: "Guest User has phone ''. Sofia Rossi has phone NULL. Both look blank in some UIs, but SQL treats them differently.",
    },
    {
      type: "sql-playground",
      title: "Explore phone values",
      initialSQL:
        "SELECT name, phone, COALESCE(phone, 'No phone') AS phone_display\nFROM customers\nORDER BY name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "handle-null-phones",
    },
  ],
};

export const functionsCheckpointLesson: LessonDefinition = {
  slug: "functions-checkpoint",
  title: "Functions & Expressions Checkpoint",
  summary: "Check expressions, functions, CASE, and NULL handling.",
  estimatedMinutes: 16,
  sortOrder: 31,
  conceptIds: [],
  quizId: "functions-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "Confirm you can build derived columns, use common functions, classify with CASE, and handle NULL.",
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
