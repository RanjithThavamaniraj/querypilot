import type { LessonDefinition } from "@/lib/learn/types";

export const whyJoins: LessonDefinition = {
  slug: "why-joins",
  title: "Why Joins Exist",
  summary: "Connect related tables using primary keys and foreign keys.",
  estimatedMinutes: 10,
  sortOrder: 36,
  conceptIds: ["cluster-database-schema"],
  blocks: [
    {
      type: "paragraph",
      text: "Shop data is split across tables on purpose. Customers store people. Products store items. Orders store purchases and point at both with foreign keys.",
    },
    {
      type: "list",
      items: [
        "customers.id is a primary key",
        "orders.customer_id references customers.id",
        "orders.product_id references products.id",
        "A join follows those links to build a wider result",
      ],
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
    {
      type: "concept-callout",
      conceptId: "cluster-database-schema",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Joins answer questions like “who bought what?” without duplicating customer names inside every order row.",
    },
  ],
};

export const innerJoinLesson: LessonDefinition = {
  slug: "inner-join",
  title: "INNER JOIN",
  summary: "Keep only rows that match on both sides of the join.",
  estimatedMinutes: 12,
  sortOrder: 37,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "INNER JOIN returns matches. If a customer has no orders, that customer does not appear in an inner join to orders.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT c.name, o.id AS order_id, o.ordered_at\nFROM customers c\nINNER JOIN orders o ON o.customer_id = c.id;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Join customers to orders",
      initialSQL:
        "SELECT c.name, o.id AS order_id, o.ordered_at\nFROM customers c\nINNER JOIN orders o ON o.customer_id = c.id\nORDER BY o.ordered_at;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customer-order-info",
    },
    {
      type: "sql-challenge",
      challengeId: "orders-with-products",
    },
  ],
};

export const leftJoinLesson: LessonDefinition = {
  slug: "left-join",
  title: "LEFT JOIN",
  summary: "Keep every row from the left table, even when the right side has no match.",
  estimatedMinutes: 12,
  sortOrder: 38,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "LEFT JOIN keeps all left-table rows. Missing right-side columns become NULL. That is how you find customers with no orders.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Customers with no orders",
      code: "SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
    },
    {
      type: "sql-playground",
      title: "Find unmatched customers",
      initialSQL:
        "SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nORDER BY c.name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customers-with-no-orders",
    },
    {
      type: "sql-challenge",
      challengeId: "products-with-no-orders",
    },
  ],
};

export const otherJoins: LessonDefinition = {
  slug: "other-joins",
  title: "RIGHT, FULL, CROSS, and Self Joins",
  summary: "Know the less common join shapes and when they matter.",
  estimatedMinutes: 12,
  sortOrder: 39,
  conceptIds: [],
  blocks: [
    {
      type: "list",
      items: [
        "RIGHT JOIN — keep all right-table rows (often rewritten as a LEFT JOIN)",
        "FULL OUTER JOIN — keep unmatched rows from both sides",
        "CROSS JOIN — every combination (Cartesian product); use carefully",
        "Self join — join a table to itself (for example customers sharing a country)",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "Self join: pairs of customers in the same country",
      code: "SELECT a.name AS customer_a, b.name AS customer_b, a.country\nFROM customers a\nJOIN customers b\n  ON a.country = b.country\n AND a.id < b.id;",
    },
    {
      type: "code",
      language: "sql",
      caption: "CROSS JOIN (small result for demo)",
      code: "SELECT c.name, p.name AS product\nFROM customers c\nCROSS JOIN products p\nWHERE c.id = 1 AND p.id <= 3;",
    },
    {
      type: "callout",
      tone: "note",
      text: "A missing join condition between two tables is an accidental CROSS JOIN—row counts explode. Always check ON clauses.",
    },
    {
      type: "sql-playground",
      title: "Try a self join",
      initialSQL:
        "SELECT a.name AS customer_a, b.name AS customer_b, a.country\nFROM customers a\nJOIN customers b\n  ON a.country = b.country\n AND a.id < b.id\nORDER BY a.country, customer_a;",
      datasetId: "shop",
    },
  ],
};

export const joiningMultipleTables: LessonDefinition = {
  slug: "joining-multiple-tables",
  title: "Joining Multiple Tables",
  summary: "Follow the keys: customers → orders → products.",
  estimatedMinutes: 12,
  sortOrder: 40,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Most real questions need more than two tables. Chain joins along foreign keys and use aliases so columns stay clear.",
    },
    {
      type: "code",
      language: "sql",
      code: "SELECT c.name AS customer, p.name AS product, o.quantity\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN products p ON o.product_id = p.id;",
    },
    {
      type: "sql-playground",
      title: "Three-table join",
      initialSQL:
        "SELECT c.name AS customer, p.name AS product, o.quantity, o.ordered_at\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN products p ON o.product_id = p.id\nORDER BY o.ordered_at;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customer-product-purchases",
    },
    {
      type: "sql-challenge",
      challengeId: "multi-table-join-filtered",
    },
  ],
};

export const joinMistakes: LessonDefinition = {
  slug: "join-mistakes",
  title: "Join Mistakes",
  summary: "Avoid Cartesian products, ambiguous columns, and filtering mistakes.",
  estimatedMinutes: 10,
  sortOrder: 41,
  conceptIds: [],
  blocks: [
    {
      type: "list",
      items: [
        "Forgetting ON — accidental Cartesian product",
        "Selecting bare id after a join — ambiguous column",
        "Filtering the right table in WHERE after LEFT JOIN — can turn it into an INNER JOIN",
        "Joining on the wrong columns — silent wrong answers",
      ],
    },
    {
      type: "example",
      title: "LEFT JOIN gotcha",
      body: "WHERE o.id IS NULL finds unmatched left rows. WHERE o.ordered_at >= '2024-07-01' drops unmatched customers because NULL fails the comparison—often unintentionally.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Aggregate after a join",
      code: "SELECT c.country, COUNT(*) AS order_count\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nGROUP BY c.country;",
    },
    {
      type: "sql-playground",
      title: "Join then aggregate",
      initialSQL:
        "SELECT c.country, COUNT(*) AS order_count\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nGROUP BY c.country\nORDER BY order_count DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "order-counts-by-country",
    },
  ],
};

export const joinsCheckpointLesson: LessonDefinition = {
  slug: "joins-checkpoint",
  title: "Joins Checkpoint",
  summary: "Confirm INNER JOIN, LEFT JOIN, multi-table joins, and common pitfalls.",
  estimatedMinutes: 18,
  sortOrder: 42,
  conceptIds: ["query-flow"],
  quizId: "joins-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "Joins are core SQL. This checkpoint checks that you can connect tables and find unmatched rows.",
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
