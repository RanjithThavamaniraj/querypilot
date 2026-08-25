import type { LessonDefinition } from "@/lib/learn/types";

export const orderByLesson: LessonDefinition = {
  slug: "order-by",
  title: "ORDER BY",
  summary:
    "Tell PostgreSQL how to sort the result—because row order is not guaranteed without it.",
  estimatedMinutes: 10,
  sortOrder: 11,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "A SELECT without ORDER BY returns rows in an order PostgreSQL chooses. That order can change. Never assume “the first row” means anything useful unless you sort.",
    },
    {
      type: "heading",
      text: "What ORDER BY asks PostgreSQL to do",
    },
    {
      type: "paragraph",
      text: "ORDER BY sorts the result set before it is returned to you. PostgreSQL still reads and filters as usual; sorting is an extra step in producing the final table you see.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Customers sorted by name",
      code: "SELECT name, country\nFROM customers\nORDER BY name;",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Sort customers by name",
      initialSQL: "SELECT name, country\nFROM customers\nORDER BY name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "customers-alphabetical",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Try the same SELECT without ORDER BY, then add ORDER BY name again. Notice that only the ordered query makes the alphabet reliable.",
    },
  ],
};

export const ascAndDesc: LessonDefinition = {
  slug: "asc-and-desc",
  title: "ASC and DESC",
  summary: "Control ascending vs descending sort direction for each column.",
  estimatedMinutes: 9,
  sortOrder: 12,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "ASC means ascending (A→Z, small→large, old→new). DESC means descending (Z→A, large→small, new→old). If you omit the direction, PostgreSQL uses ASC.",
    },
    {
      type: "list",
      items: [
        "ORDER BY price ASC — cheapest first",
        "ORDER BY price DESC — most expensive first",
        "ORDER BY ordered_at DESC — latest orders first",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "Highest-priced products first",
      code: "SELECT name, price\nFROM products\nORDER BY price DESC;",
    },
    {
      type: "example",
      title: "Why DESC changes the result",
      body: "Same rows, different presentation. DESC flips the sort key so the largest price appears at the top. Without ORDER BY, “highest price first” is not something you can trust.",
    },
    {
      type: "sql-playground",
      title: "Sort products by price",
      initialSQL: "SELECT name, price\nFROM products\nORDER BY price DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "products-highest-price",
    },
    {
      type: "code",
      language: "sql",
      caption: "Most recent orders",
      code: "SELECT id, customer_id, ordered_at\nFROM orders\nORDER BY ordered_at DESC;",
    },
    {
      type: "sql-playground",
      title: "Latest orders first",
      initialSQL:
        "SELECT id, customer_id, ordered_at\nFROM orders\nORDER BY ordered_at DESC;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "latest-orders",
    },
  ],
};

export const sortingMultipleColumns: LessonDefinition = {
  slug: "sorting-multiple-columns",
  title: "Sorting by Multiple Columns",
  summary: "Break ties by sorting on a second (or third) column.",
  estimatedMinutes: 9,
  sortOrder: 13,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "List columns in ORDER BY from most important to least important. PostgreSQL sorts by the first column, then uses the next column only when values tie.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Category first, then price within each category",
      code: "SELECT name, category, price\nFROM products\nORDER BY category, price DESC;",
    },
    {
      type: "example",
      title: "How to read multi-column ORDER BY",
      body: "category ASC groups Accessories together, then Audio, and so on. Inside Accessories, price DESC puts the expensive accessory above the cheaper ones.",
    },
    {
      type: "sql-playground",
      title: "Try a two-column sort",
      initialSQL:
        "SELECT name, category, price\nFROM products\nORDER BY category, price DESC;",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "note",
      text: "You can mix directions: ORDER BY category ASC, price DESC.",
    },
  ],
};

export const limitLesson: LessonDefinition = {
  slug: "limit",
  title: "LIMIT",
  summary: "Return only the first N rows of the (sorted) result.",
  estimatedMinutes: 9,
  sortOrder: 14,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "LIMIT caps how many rows come back. Combined with ORDER BY, it answers “top N” questions—like the three most expensive products.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Top three products by price",
      code: "SELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
    },
    {
      type: "list",
      items: [
        "ORDER BY decides which rows are “first”",
        "LIMIT keeps only that many rows",
        "Without ORDER BY, LIMIT still returns some N rows—but not a meaningful top N",
      ],
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "sql-playground",
      title: "Return a top-N list",
      initialSQL:
        "SELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "top-three-products",
    },
  ],
};

export const offsetLesson: LessonDefinition = {
  slug: "offset",
  title: "OFFSET",
  summary: "Skip rows so you can page through a sorted result.",
  estimatedMinutes: 10,
  sortOrder: 15,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "OFFSET skips a number of rows after sorting (and filtering). LIMIT then takes the next batch. Together they power simple pagination: page 1, page 2, page 3…",
    },
    {
      type: "code",
      language: "sql",
      caption: "Skip the three cheapest products, then take the next three",
      code: "SELECT name, price\nFROM products\nORDER BY price ASC\nLIMIT 3 OFFSET 3;",
    },
    {
      type: "example",
      title: "Why ORDER BY matters with OFFSET",
      body: "Pagination without a stable ORDER BY can show duplicates or skip rows between pages. Always pair LIMIT/OFFSET with a deterministic sort for practice and for production habits.",
    },
    {
      type: "sql-playground",
      title: "Page through products by price",
      initialSQL:
        "SELECT name, price\nFROM products\nORDER BY price ASC\nLIMIT 3 OFFSET 3;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "products-page",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Change OFFSET to 0, 3, and 6 while keeping LIMIT 3. You are walking through the sorted list three rows at a time.",
    },
  ],
};

export const whereOrderBy: LessonDefinition = {
  slug: "where-and-order-by",
  title: "WHERE + ORDER BY",
  summary: "Filter first, then sort the remaining rows.",
  estimatedMinutes: 9,
  sortOrder: 16,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "Clause order in a SELECT is fixed: FROM → WHERE → ORDER BY → LIMIT. Mentally: choose the table, keep matching rows, sort those rows.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Indian customers, A→Z by name",
      code: "SELECT name, country\nFROM customers\nWHERE country = 'India'\nORDER BY name;",
    },
    {
      type: "example",
      title: "What PostgreSQL is doing",
      body: "WHERE reduces the set to India. ORDER BY name sorts only that smaller set. Customers from other countries never appear—even if their names would sort earlier.",
    },
    {
      type: "sql-playground",
      title: "Filter, then sort",
      initialSQL:
        "SELECT name, country\nFROM customers\nWHERE country = 'India'\nORDER BY name;",
      datasetId: "shop",
    },
    {
      type: "sql-challenge",
      challengeId: "india-customers-sorted",
    },
  ],
};

export const whereOrderLimit: LessonDefinition = {
  slug: "where-order-by-limit",
  title: "WHERE + ORDER BY + LIMIT",
  summary: "Combine filtering, sorting, and top-N in one practical pattern.",
  estimatedMinutes: 10,
  sortOrder: 17,
  conceptIds: ["query-flow"],
  blocks: [
    {
      type: "paragraph",
      text: "Real questions often stack all three: “Among Accessories, what are the two most expensive?” Filter → sort → limit.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Two priciest accessories",
      code: "SELECT name, category, price\nFROM products\nWHERE category = 'Accessories'\nORDER BY price DESC\nLIMIT 2;",
    },
    {
      type: "list",
      items: [
        "WHERE shrinks the candidate rows",
        "ORDER BY ranks those candidates",
        "LIMIT keeps only the top of that ranked list",
      ],
    },
    {
      type: "sql-playground",
      title: "Filter, sort, and take top N",
      initialSQL:
        "SELECT name, category, price\nFROM products\nWHERE category = 'Accessories'\nORDER BY price DESC\nLIMIT 2;",
      datasetId: "shop",
    },
    {
      type: "code",
      language: "sql",
      caption: "Cheapest products under $50",
      code: "SELECT name, price\nFROM products\nWHERE price < 50\nORDER BY price ASC\nLIMIT 5;",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Read the result and ask: Did WHERE remove the right rows? Does ORDER BY match the question? Is LIMIT the count you wanted?",
    },
  ],
};

export const sortingPatterns: LessonDefinition = {
  slug: "sorting-patterns",
  title: "Practical Sorting Patterns",
  summary: "Reuse common shop patterns: top N, cheapest, latest, and filtered lists.",
  estimatedMinutes: 10,
  sortOrder: 18,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "Most day-to-day SELECT work is a remix of filter + sort + limit. Practice recognizing the pattern from the English question.",
    },
    {
      type: "heading",
      text: "Pattern → SQL shape",
    },
    {
      type: "list",
      items: [
        "“Highest / most expensive / latest” → ORDER BY … DESC (+ LIMIT for top N)",
        "“Cheapest / earliest / A to Z” → ORDER BY … ASC",
        "“Only India / only Accessories” → WHERE before ORDER BY",
        "“Page 2 of results” → ORDER BY + LIMIT + OFFSET",
      ],
    },
    {
      type: "code",
      language: "sql",
      caption: "Latest three orders",
      code: "SELECT id, customer_id, ordered_at\nFROM orders\nORDER BY ordered_at DESC\nLIMIT 3;",
    },
    {
      type: "code",
      language: "sql",
      caption: "Cheapest five products",
      code: "SELECT name, price\nFROM products\nORDER BY price ASC\nLIMIT 5;",
    },
    {
      type: "sql-playground",
      title: "Pick a pattern and run it",
      initialSQL:
        "SELECT id, customer_id, ordered_at\nFROM orders\nORDER BY ordered_at DESC\nLIMIT 3;",
      datasetId: "shop",
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
  ],
};

export const sortingCommonMistakes: LessonDefinition = {
  slug: "sorting-common-mistakes",
  title: "Common Sorting Mistakes",
  summary: "Avoid relying on accidental order, forgetting DESC, or paging without ORDER BY.",
  estimatedMinutes: 8,
  sortOrder: 19,
  conceptIds: [],
  blocks: [
    {
      type: "heading",
      text: "Mistakes to watch for",
    },
    {
      type: "list",
      items: [
        "Assuming SELECT * returns rows in insert order or by id—it might today and not tomorrow",
        "Using LIMIT for “top N” without ORDER BY",
        "Forgetting DESC when you wanted highest/latest first",
        "Paginating with LIMIT/OFFSET but no stable ORDER BY",
        "Sorting by a column that is not in the SELECT list—allowed, but easy to confuse yourself",
      ],
    },
    {
      type: "example",
      title: "Bad habit",
      body: "SELECT * FROM products LIMIT 3; — returns three products, but not “the three most expensive” unless you also ORDER BY price DESC.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Reliable top-N habit",
      code: "SELECT name, price\nFROM products\nORDER BY price DESC\nLIMIT 3;",
    },
    {
      type: "sql-playground",
      title: "Compare with and without ORDER BY",
      initialSQL: "SELECT name, price\nFROM products\nLIMIT 3;",
      datasetId: "shop",
    },
    {
      type: "callout",
      tone: "note",
      text: "If the question mentions order, dates, “top”, “cheapest”, or “latest”, your SQL almost certainly needs ORDER BY.",
    },
  ],
};

export const sortingLimitingCheckpointLesson: LessonDefinition = {
  slug: "sorting-limiting-checkpoint",
  title: "Sorting & Limiting Checkpoint",
  summary:
    "Confirm you can sort, reverse direction, limit, page with OFFSET, and combine filters with ORDER BY.",
  estimatedMinutes: 20,
  sortOrder: 20,
  conceptIds: ["query-flow"],
  quizId: "sorting-limiting-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "This checkpoint checks sorting and limiting on top of the SELECT and WHERE skills you already have. You still write real SQL against the shop dataset in earlier challenges—here you prove the ideas in a short quiz.",
    },
    {
      type: "heading",
      text: "Before you start",
    },
    {
      type: "list",
      items: [
        "ORDER BY makes result order meaningful",
        "ASC vs DESC flips direction",
        "LIMIT / OFFSET need ORDER BY for predictable pages and top-N lists",
        "WHERE filters before you sort",
        "SQL still flows through PostgreSQL’s query pipeline—sort and limit shape the result you see",
      ],
    },
    {
      type: "schema-panel",
      datasetId: "shop",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Pass with 7/10. You can retry. Continue Learning will pick up the next incomplete lesson after you finish.",
    },
  ],
};
