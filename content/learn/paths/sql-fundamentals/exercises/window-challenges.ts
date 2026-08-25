import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: true, datasetId: "shop", ...challenge };
}

export const rankProductsByPrice = q({
  id: "rank-products-by-price",
  title: "Rank products by price",
  prompt:
    "Return name, price, and price_rank using RANK() ordered by price descending.",
  initialSQL: "SELECT name, price,\n  RANK() OVER (",
  referenceSQL:
    "SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products",
  expectedColumns: ["name", "price", "price_rank"],
  successFeedback:
    "RANK() numbers rows by the ORDER BY inside OVER. Ties share a rank. The table still has one row per product.",
  failureFeedback: "RANK() OVER (ORDER BY price DESC) AS price_rank",
  hint: "SELECT name, price, RANK() OVER (ORDER BY price DESC) AS price_rank FROM products",
});

export const rankProductsWithinCategory = q({
  id: "rank-products-within-category",
  title: "Rank within category",
  prompt:
    "Return name, category, price, and category_rank: RANK by price DESC partitioned by category.",
  initialSQL: "SELECT name, category, price,\n  RANK() OVER (",
  referenceSQL:
    "SELECT name, category, price, RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank FROM products",
  expectedColumns: ["name", "category", "price", "category_rank"],
  successFeedback:
    "PARTITION BY category restarts ranking inside each category. That is how “top in group” questions begin.",
  failureFeedback: "PARTITION BY category ORDER BY price DESC",
  hint: "RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank",
});

export const topProductPerCategory = q({
  id: "top-product-per-category",
  title: "Top product per category",
  prompt:
    "Using a subquery or CTE with ROW_NUMBER() partitioned by category ordered by price DESC, return name, category, and price for rn = 1.",
  initialSQL:
    "SELECT name, category, price\nFROM (\n  SELECT name, category, price,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn\n  FROM products\n) ranked\nWHERE ",
  referenceSQL:
    "SELECT name, category, price FROM (SELECT name, category, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn FROM products) ranked WHERE rn = 1",
  expectedColumns: ["name", "category", "price"],
  requiresOrder: false,
  successFeedback:
    "ROW_NUMBER assigns a unique position. Filtering rn = 1 keeps the top product in each category.",
  failureFeedback: "ROW_NUMBER in a subquery/CTE, then WHERE rn = 1.",
  hint: "WHERE rn = 1",
});

export const productRowNumbers = q({
  id: "product-row-numbers",
  title: "Product row numbers",
  prompt:
    "Return name, price, and row_num using ROW_NUMBER() ordered by price ascending.",
  initialSQL: "SELECT name, price,\n  ROW_NUMBER() OVER (",
  referenceSQL:
    "SELECT name, price, ROW_NUMBER() OVER (ORDER BY price ASC) AS row_num FROM products",
  expectedColumns: ["name", "price", "row_num"],
  successFeedback:
    "ROW_NUMBER always produces unique numbers even when prices tie—unlike RANK.",
  failureFeedback: "ROW_NUMBER() OVER (ORDER BY price ASC) AS row_num",
  hint: "ROW_NUMBER() OVER (ORDER BY price ASC) AS row_num",
});

export const lagPreviousPrice = q({
  id: "lag-previous-price",
  title: "Previous price with LAG",
  prompt:
    "Return name, price, and previous_price: LAG(price) ordered by price ascending.",
  initialSQL: "SELECT name, price,\n  LAG(price) OVER (",
  referenceSQL:
    "SELECT name, price, LAG(price) OVER (ORDER BY price ASC) AS previous_price FROM products",
  expectedColumns: ["name", "price", "previous_price"],
  successFeedback:
    "LAG looks at the previous row in the window order. The first row’s previous_price is NULL.",
  failureFeedback: "LAG(price) OVER (ORDER BY price ASC) AS previous_price",
  hint: "LAG(price) OVER (ORDER BY price ASC) AS previous_price",
});

export const runningTotalQuantities = q({
  id: "running-total-quantities",
  title: "Running total of quantities",
  prompt:
    "Return order id, quantity, and running_qty: a running SUM(quantity) ordered by ordered_at, id.",
  initialSQL: "SELECT id, quantity,\n  SUM(quantity) OVER (",
  referenceSQL:
    "SELECT id, quantity, SUM(quantity) OVER (ORDER BY ordered_at, id) AS running_qty FROM orders",
  expectedColumns: ["id", "quantity", "running_qty"],
  successFeedback:
    "A window SUM with ORDER BY accumulates a running total without collapsing rows the way GROUP BY would.",
  failureFeedback: "SUM(quantity) OVER (ORDER BY ordered_at, id) AS running_qty",
  hint: "SUM(quantity) OVER (ORDER BY ordered_at, id) AS running_qty",
});

export const windowChallenges: SqlChallengeDefinition[] = [
  rankProductsByPrice,
  rankProductsWithinCategory,
  topProductPerCategory,
  productRowNumbers,
  lagPreviousPrice,
  runningTotalQuantities,
];
