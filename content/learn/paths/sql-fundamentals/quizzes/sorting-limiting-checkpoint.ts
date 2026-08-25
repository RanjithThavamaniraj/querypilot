import type { QuizDefinition } from "@/lib/learn/types";

export const sortingLimitingCheckpoint: QuizDefinition = {
  id: "sorting-limiting-checkpoint",
  title: "Sorting & Limiting Checkpoint",
  description:
    "Confirm you understand ORDER BY, ASC/DESC, LIMIT, OFFSET, and combining them with WHERE.",
  passScore: 7,
  questions: [
    {
      id: "q1",
      prompt: "What does ORDER BY tell PostgreSQL to do?",
      options: [
        { id: "a", label: "Delete rows permanently" },
        { id: "b", label: "Sort the result set before returning it" },
        { id: "c", label: "Create a new database" },
        { id: "d", label: "Ignore the WHERE clause" },
      ],
      correctOptionId: "b",
      explanation:
        "ORDER BY sorts the rows in the result. It does not change stored table data.",
    },
    {
      id: "q2",
      prompt: "If you omit ASC or DESC after ORDER BY price, what happens?",
      options: [
        { id: "a", label: "PostgreSQL rejects the query" },
        { id: "b", label: "PostgreSQL uses ASC by default" },
        { id: "c", label: "PostgreSQL uses DESC by default" },
        { id: "d", label: "Rows stay in random insert order forever" },
      ],
      correctOptionId: "b",
      explanation: "The default sort direction is ascending (ASC).",
    },
    {
      id: "q3",
      prompt: "Which clause returns the most expensive products first?",
      options: [
        { id: "a", label: "ORDER BY price ASC" },
        { id: "b", label: "ORDER BY price DESC" },
        { id: "c", label: "WHERE price DESC" },
        { id: "d", label: "LIMIT price" },
      ],
      correctOptionId: "b",
      explanation: "DESC puts larger values first—highest price at the top.",
    },
    {
      id: "q4",
      prompt: "Why is ORDER BY important when you use LIMIT for a “top 3” list?",
      options: [
        {
          id: "a",
          label: "LIMIT alone already knows what “top” means",
        },
        {
          id: "b",
          label:
            "ORDER BY defines which rows are first; LIMIT then keeps that many",
        },
        { id: "c", label: "ORDER BY is illegal with LIMIT" },
        { id: "d", label: "LIMIT deletes the other rows from the table" },
      ],
      correctOptionId: "b",
      explanation:
        "LIMIT only counts rows. Without ORDER BY, “top 3” is not meaningful.",
    },
    {
      id: "q5",
      prompt: "What does OFFSET 3 do in ORDER BY price ASC LIMIT 3 OFFSET 3?",
      options: [
        { id: "a", label: "Returns only products with id = 3" },
        { id: "b", label: "Skips the first 3 sorted rows, then LIMIT takes the next 3" },
        { id: "c", label: "Sorts by the third column only" },
        { id: "d", label: "Raises the price of every product by 3" },
      ],
      correctOptionId: "b",
      explanation:
        "OFFSET skips rows after sorting; LIMIT then returns the following batch—classic pagination.",
    },
    {
      id: "q6",
      prompt:
        "In SELECT … FROM products WHERE category = 'Audio' ORDER BY price DESC LIMIT 2, what happens first logically?",
      options: [
        { id: "a", label: "LIMIT runs before WHERE" },
        { id: "b", label: "Rows are filtered with WHERE, then sorted, then limited" },
        { id: "c", label: "ORDER BY runs before the table is chosen" },
        { id: "d", label: "PostgreSQL ignores WHERE when LIMIT is present" },
      ],
      correctOptionId: "b",
      explanation:
        "You filter candidates, rank them, then keep the top of that ranked list.",
    },
    {
      id: "q7",
      prompt: "ORDER BY category, price DESC means:",
      options: [
        {
          id: "a",
          label: "Sort only by price; category is ignored",
        },
        {
          id: "b",
          label:
            "Sort by category first; within the same category, sort by price descending",
        },
        { id: "c", label: "Sort by price, then delete the category column" },
        { id: "d", label: "Require two separate queries" },
      ],
      correctOptionId: "b",
      explanation:
        "Earlier ORDER BY keys are primary; later keys break ties.",
    },
    {
      id: "q8",
      prompt: "Why can pagination without ORDER BY be problematic?",
      options: [
        {
          id: "a",
          label: "PostgreSQL forbids LIMIT without ORDER BY",
        },
        {
          id: "b",
          label:
            "Row order may change, so pages can skip or duplicate rows",
        },
        { id: "c", label: "OFFSET only works on empty tables" },
        { id: "d", label: "LIMIT always returns zero rows" },
      ],
      correctOptionId: "b",
      explanation:
        "Without a deterministic ORDER BY, “page 2” is not a stable window over the same sequence.",
    },
    {
      id: "q9",
      prompt: "SELECT * FROM customers; without ORDER BY:",
      options: [
        {
          id: "a",
          label: "Always returns rows sorted by id forever",
        },
        {
          id: "b",
          label:
            "Returns rows in an order you should not rely on",
        },
        { id: "c", label: "Fails unless you add LIMIT" },
        { id: "d", label: "Sorts alphabetically by name automatically" },
      ],
      correctOptionId: "b",
      explanation:
        "Databases do not promise a stable order unless you ask with ORDER BY.",
    },
    {
      id: "q10",
      prompt:
        "When QueryPilot runs your ORDER BY query, what is still true about the architecture map?",
      options: [
        {
          id: "a",
          label: "SQL is processed by PostgreSQL and a result set is produced",
        },
        { id: "b", label: "ORDER BY bypasses PostgreSQL entirely" },
        { id: "c", label: "Sorting happens only in the browser CSS" },
        { id: "d", label: "The app database executes learner SQL" },
      ],
      correctOptionId: "a",
      explanation:
        "Sorting and limiting still go through the same query flow: your SQL → PostgreSQL → result.",
    },
  ],
};
