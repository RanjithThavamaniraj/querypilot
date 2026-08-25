import type { LessonDefinition } from "@/lib/learn/types";

export const insertLesson: LessonDefinition = {
  slug: "insert",
  title: "INSERT",
  summary: "Add new rows with INSERT—and see why practice writes never damage the shared shop data.",
  estimatedMinutes: 12,
  sortOrder: 21,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "INSERT adds rows. You list columns and VALUES. In QueryPilot, every write runs on a private copy of the shop tables and is discarded after the run—so you can practice safely.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Insert one customer",
      code: "INSERT INTO customers (id, name, email, country, created_at)\nVALUES (20, 'Rita Lopez', 'rita@example.com', 'Mexico', '2024-09-01');",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "callout",
      tone: "tip",
      text: "After INSERT, run a SELECT for that id to observe the new row. The shared dataset is unchanged when you leave the editor.",
    },
    {
      type: "sql-playground",
      title: "Insert and inspect",
      initialSQL:
        "INSERT INTO customers (id, name, email, country, created_at)\nVALUES (20, 'Rita Lopez', 'rita@example.com', 'Mexico', '2024-09-01');\n\nSELECT * FROM customers WHERE id = 20;",
      datasetId: "shop",
    },
    {
      type: "heading",
      text: "Multiple rows and INSERT … SELECT",
    },
    {
      type: "code",
      language: "sql",
      caption: "Insert several products",
      code: "INSERT INTO products (id, name, category, price)\nVALUES\n  (20, 'USB Cable', 'Accessories', 9.99),\n  (21, 'HDMI Cable', 'Accessories', 12.50);",
    },
    {
      type: "code",
      language: "sql",
      caption: "Copy rows with INSERT … SELECT",
      code: "INSERT INTO products (id, name, category, price)\nSELECT 30, name || ' (copy)', category, price\nFROM products\nWHERE id = 1;",
    },
    {
      type: "sql-challenge",
      challengeId: "insert-a-customer",
    },
    {
      type: "sql-challenge",
      challengeId: "insert-multiple-products",
    },
  ],
};

export const updateLesson: LessonDefinition = {
  slug: "update",
  title: "UPDATE",
  summary: "Change existing values—and always decide which rows with WHERE.",
  estimatedMinutes: 11,
  sortOrder: 22,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "UPDATE rewrites column values on matching rows. Without WHERE, every row changes. That is rarely what you want.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Update one customer",
      code: "UPDATE customers\nSET country = 'Portugal'\nWHERE name = 'Chloe Martin';",
    },
    {
      type: "code",
      language: "sql",
      caption: "Update from an expression",
      code: "UPDATE products\nSET price = price + 5\nWHERE category = 'Audio';",
    },
    {
      type: "sql-playground",
      title: "Try an UPDATE",
      initialSQL:
        "UPDATE customers\nSET country = 'Portugal'\nWHERE name = 'Chloe Martin';\n\nSELECT name, country FROM customers WHERE name = 'Chloe Martin';",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "update-customer-country",
    },
    {
      type: "sql-challenge",
      challengeId: "update-product-prices",
    },
  ],
};

export const deleteLesson: LessonDefinition = {
  slug: "delete",
  title: "DELETE",
  summary: "Remove rows carefully. WHERE is the difference between one test row and a wiped table.",
  estimatedMinutes: 10,
  sortOrder: 23,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "DELETE removes rows. Pair it with WHERE. A DELETE without WHERE deletes the entire table’s data.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Delete one product",
      code: "DELETE FROM products\nWHERE name = 'Gift Card';",
    },
    {
      type: "example",
      title: "Dangerous pattern",
      body: "DELETE FROM products; — every product gone. In production that is a disaster. Always ask: which rows should survive?",
    },
    {
      type: "sql-playground",
      title: "Delete with WHERE",
      initialSQL:
        "DELETE FROM products\nWHERE name = 'Gift Card';\n\nSELECT name FROM products ORDER BY name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "delete-test-record",
    },
  ],
};

export const transactionsLesson: LessonDefinition = {
  slug: "transactions",
  title: "Transactions",
  summary: "Group changes with BEGIN, COMMIT, and ROLLBACK so work succeeds or fails together.",
  estimatedMinutes: 14,
  sortOrder: 24,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "A transaction is a unit of work. BEGIN starts it. COMMIT keeps the changes. ROLLBACK undoes them. Until you COMMIT, other sessions typically do not see your writes.",
    },
    {
      type: "list",
      items: [
        "BEGIN — start a transaction",
        "COMMIT — make changes permanent (in a real database)",
        "ROLLBACK — discard changes",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "Commit an insert",
      code: "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at)\nVALUES (30, 'Txn User', 'txn@example.com', 'Kenya', '2024-09-02');\nCOMMIT;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Rollback an insert",
      code: "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at)\nVALUES (31, 'Gone User', 'gone@example.com', 'Kenya', '2024-09-02');\nROLLBACK;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "callout",
      tone: "note",
      text: "In QueryPilot you can practice COMMIT and ROLLBACK on a private copy. After the run finishes, that copy is discarded so the shared educational dataset stays intact.",
    },
    {
      type: "sql-playground",
      title: "See rollback undo a write",
      initialSQL:
        "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at)\nVALUES (31, 'Gone User', 'gone@example.com', 'Kenya', '2024-09-02');\nSELECT id, name FROM customers WHERE id = 31;\nROLLBACK;\nSELECT id, name FROM customers WHERE id = 31;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "transaction-commit",
    },
    {
      type: "sql-challenge",
      challengeId: "transaction-rollback",
    },
  ],
};

export const safeDataChanges: LessonDefinition = {
  slug: "safe-data-changes",
  title: "Safe Data Modification",
  summary: "Habits that prevent accidental mass updates and deletes.",
  estimatedMinutes: 10,
  sortOrder: 25,
  conceptIds: [],
  blocks: [
    {
      type: "heading",
      text: "Before you change data",
    },
    {
      type: "list",
      items: [
        "Write the SELECT that finds the rows you intend to change",
        "Add WHERE (or JOIN filters) before UPDATE/DELETE",
        "Prefer transactions so you can ROLLBACK surprises",
        "Never run UPDATE/DELETE without a limiting condition unless you truly mean every row",
      ],
    },
    {
      type: "example",
      title: "Safe workflow",
      body: "SELECT * FROM customers WHERE name = 'Chloe Martin'; then UPDATE … WHERE name = 'Chloe Martin'; inside BEGIN … COMMIT when you are sure.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Preview, then update in a transaction",
      code: "BEGIN;\nSELECT name, country FROM customers WHERE name = 'Chloe Martin';\nUPDATE customers SET country = 'Portugal' WHERE name = 'Chloe Martin';\nSELECT name, country FROM customers WHERE name = 'Chloe Martin';\n-- COMMIT; or ROLLBACK;",
    },
    {
      type: "sql-playground",
      title: "Practice the safe habit",
      initialSQL:
        "BEGIN;\nSELECT name, country FROM customers WHERE name = 'Chloe Martin';\nUPDATE customers SET country = 'Portugal' WHERE name = 'Chloe Martin';\nSELECT name, country FROM customers WHERE name = 'Chloe Martin';\nROLLBACK;",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "tip",
      text: "QueryPilot’s private copy protects the classroom dataset. Real databases do not. Treat every write as if it were production.",
    },
  ],
};

export const workingWithDataCheckpointLesson: LessonDefinition = {
  slug: "working-with-data-checkpoint",
  title: "Working with Data Checkpoint",
  summary: "Confirm INSERT, UPDATE, DELETE, and transaction basics.",
  estimatedMinutes: 18,
  sortOrder: 26,
  conceptIds: ["query-flow"],
  quizId: "working-with-data-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "This checkpoint checks that you can modify data safely and explain BEGIN / COMMIT / ROLLBACK.",
    },
    {
      type: "list",
      items: [
        "INSERT adds rows",
        "UPDATE/DELETE need WHERE for safety",
        "Transactions group work that should succeed or fail together",
        "Practice writes never permanently change QueryPilot’s shared shop data",
      ],
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
