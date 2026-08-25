import type { LessonDefinition } from "@/lib/learn/types";

export const distinctLesson: LessonDefinition = {
  slug: "distinct",
  title: "DISTINCT",
  summary: "Remove duplicate values from a result set.",
  estimatedMinutes: 8,
  sortOrder: 6,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Several customers can share a country. DISTINCT returns each unique value once.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT DISTINCT country\nFROM customers;",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT DISTINCT country\nFROM customers;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "distinct-countries",
    },
  ],
};

export const whereLesson: LessonDefinition = {
  slug: "where",
  title: "WHERE",
  summary: "Filter rows so only matching records are returned.",
  estimatedMinutes: 10,
  sortOrder: 7,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "WHERE decides which rows survive into the result. Think of it as a yes/no test for every row.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Only customers in India",
      code: "SELECT *\nFROM customers\nWHERE country = 'India';",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT *\nFROM customers\nWHERE country = 'India';",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customers-from-india",
    },
  ],
};

export const comparisonOperators: LessonDefinition = {
  slug: "comparison-operators",
  title: "Comparison Operators",
  summary: "Compare values with =, <>, <, >, <=, and >=.",
  estimatedMinutes: 9,
  sortOrder: 8,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Comparison operators test values in WHERE. Text uses quotes; numbers usually do not.",
    },
    {
      type: "list",
      items: [
        "= equal",
        "<> or != not equal",
        "< less than",
        "> greater than",
        "<= / >= less or equal / greater or equal",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "Products priced at least 100",
      code: "SELECT name, price\nFROM products\nWHERE price >= 100;",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT name, price\nFROM products\nWHERE price >= 100;",
      datasetId: "shop",
    },
    {
      type: "code",
      language: "sql",
      caption: "Countries other than India",
      code: "SELECT name, country\nFROM customers\nWHERE country <> 'India';",
    },
  ],
};

export const andOrNot: LessonDefinition = {
  slug: "and-or-not",
  title: "AND / OR / NOT",
  summary: "Combine filter conditions with logical operators.",
  estimatedMinutes: 10,
  sortOrder: 9,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Logical operators combine conditions. AND means every condition must be true. OR means at least one. NOT flips a condition.",
    },
    {
      type: "code",
      language: "sql",
      caption: "AND requires both conditions",
      code: "SELECT name, country\nFROM customers\nWHERE country = 'India'\n  AND name = 'Priya Sharma';",
    },
    {
      type: "code",
      language: "sql",
      caption: "OR allows either condition",
      code: "SELECT name, category, price\nFROM products\nWHERE category = 'Audio'\n   OR price < 30;",
    },
    {
      type: "sql-playground",
      initialSQL:
        "SELECT name, country\nFROM customers\nWHERE country = 'India'\n  AND name = 'Priya Sharma';",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "checkpoint-filter-and",
    },
  ],
};

export const sqlBasicsCheckpointLesson: LessonDefinition = {
  slug: "sql-basics-checkpoint",
  title: "SQL Basics Checkpoint",
  summary:
    "Prove you can write and reason about basic SELECT and WHERE queries.",
  estimatedMinutes: 20,
  sortOrder: 10,
  conceptIds: ["query-flow"],
  quizId: "sql-basics-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "This checkpoint mixes a short quiz with the SQL skills you practiced: SELECT, column lists, DISTINCT, WHERE, and AND.",
    },
    {
      type: "heading",
      text: "Before you start",
    },
    {
      type: "list",
      items: [
        "You can run SELECT against shop.customers and shop.products",
        "You can filter with WHERE",
        "You understand AND combines conditions",
        "You remember that SQL flows through PostgreSQL’s query pipeline",
      ],
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Pass the quiz with 7/10. You can retry. Use the schema panel if you forget column names.",
    },
  ],
};
