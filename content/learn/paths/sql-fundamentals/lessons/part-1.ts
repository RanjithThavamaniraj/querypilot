import type { LessonDefinition } from "@/lib/learn/types";

export const whatIsSql: LessonDefinition = {
  slug: "what-is-sql",
  title: "What is SQL?",
  summary:
    "Understand SQL as the language you use to ask PostgreSQL for data—and reconnect to the query-flow map.",
  estimatedMinutes: 8,
  sortOrder: 1,
  conceptIds: ["query-flow", "client-server"],
  blocks: [
    {
      type: "paragraph",
      text: "SQL (Structured Query Language) is how you talk to a relational database. In QueryPilot you write SQL, send it to PostgreSQL, and read the result set that comes back.",
    },
    {
      type: "heading",
      text: "What SQL is for",
    },
    {
      type: "list",
      items: [
        "Read rows with SELECT",
        "Filter with WHERE",
        "Later: insert, update, and delete data",
        "Later: join tables and aggregate results",
      ],
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "callout",
      tone: "tip",
      text: "In this module you will only SELECT from a small shop dataset. That is enough to build real SQL confidence.",
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
  ],
};

export const yourFirstSelect: LessonDefinition = {
  slug: "your-first-select",
  title: "Your First SELECT",
  summary: "Run your first real SELECT against PostgreSQL and observe the result table.",
  estimatedMinutes: 10,
  sortOrder: 2,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "The most common SQL statement starts with SELECT. You choose what to return, then name the table with FROM.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Read every column from customers",
      code: "SELECT *\nFROM customers;",
    },
    {
      type: "example",
      title: "What you should see",
      body: "A result table with columns such as id, name, email, country, and created_at—one row per customer.",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Run your first query",
      initialSQL: "SELECT *\nFROM customers;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "select-all-customers",
    },
    {
      type: "callout",
      tone: "note",
      text: "If you misspell a table name, PostgreSQL returns an error. Read it, then use the schema panel to confirm the real names.",
    },
  ],
};

export const selectingColumns: LessonDefinition = {
  slug: "selecting-columns",
  title: "Selecting Columns",
  summary: "Choose exactly which columns appear in the result.",
  estimatedMinutes: 8,
  sortOrder: 3,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "You rarely need every column. List the columns you want after SELECT, separated by commas.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Return only names and countries",
      code: "SELECT name, country\nFROM customers;",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT name, country\nFROM customers;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "select-customer-names",
    },
  ],
};

export const selectStar: LessonDefinition = {
  slug: "select-star",
  title: "SELECT *",
  summary: "Understand SELECT * as a convenience—and when being explicit is clearer.",
  estimatedMinutes: 7,
  sortOrder: 4,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "SELECT * means “all columns.” It is perfect for exploration. In production applications, teams often prefer explicit column lists so results stay predictable when tables change.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT *\nFROM products;",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT *\nFROM products;",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "tip",
      text: "For learning, SELECT * is encouraged. Later you will choose columns deliberately for joins and performance.",
    },
  ],
};

export const aliases: LessonDefinition = {
  slug: "aliases",
  title: "Aliases",
  summary: "Rename columns in the result with AS—without changing stored data.",
  estimatedMinutes: 8,
  sortOrder: 5,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "An alias labels a column in the output. The table on disk is unchanged.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Rename name in the result",
      code: "SELECT name AS customer_name, country\nFROM customers;",
    },
    {
      type: "sql-playground",
      initialSQL: "SELECT name AS customer_name, country\nFROM customers;",
      datasetId: "shop",
    },
    {
      type: "example",
      title: "Why this matters",
      body: "Aliases make results easier to read, especially once queries calculate expressions or join multiple tables.",
    },
  ],
};
