import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const finalSelectFilterSort = q({
  id: "final-select-filter-sort",
  title: "Final: filter and sort",
  prompt:
    "Return name and price for Accessories products cheaper than 50, cheapest first.",
  initialSQL: "SELECT name, price\nFROM products\nWHERE ",
  referenceSQL:
    "SELECT name, price FROM products WHERE category = 'Accessories' AND price < 50 ORDER BY price ASC",
  requiresOrder: true,
  expectedColumns: ["name", "price"],
  successFeedback: "WHERE filters; ORDER BY presents the remaining rows.",
  failureFeedback: "Filter Accessories under 50 and ORDER BY price.",
  hint: "WHERE category = 'Accessories' AND price < 50 ORDER BY price",
});

export const finalTopN = q({
  id: "final-top-n",
  title: "Final: top N",
  prompt: "Return the 2 most expensive Furniture products (name, price).",
  initialSQL: "SELECT name, price\nFROM products\nWHERE category = 'Furniture'\n",
  referenceSQL:
    "SELECT name, price FROM products WHERE category = 'Furniture' ORDER BY price DESC LIMIT 2",
  requiresOrder: true,
  expectedColumns: ["name", "price"],
  successFeedback: "Filter → order → limit is the classic top-N pattern.",
  failureFeedback: "ORDER BY price DESC LIMIT 2 for Furniture.",
  hint: "ORDER BY price DESC LIMIT 2",
});

export const finalCaseClassify = q({
  id: "final-case-classify",
  title: "Final: CASE",
  prompt:
    "Return name and stock_hint: 'Low' when quantity = 1, otherwise 'Bulk', from orders joined to nothing—just from orders.",
  initialSQL: "SELECT id, quantity,\n  CASE ",
  referenceSQL:
    "SELECT id, quantity, CASE WHEN quantity = 1 THEN 'Low' ELSE 'Bulk' END AS stock_hint FROM orders",
  expectedColumns: ["id", "quantity", "stock_hint"],
  successFeedback: "CASE classifies each order row without aggregating.",
  failureFeedback: "CASE WHEN quantity = 1 THEN 'Low' ELSE 'Bulk' END AS stock_hint",
  hint: "CASE WHEN quantity = 1 THEN 'Low' ELSE 'Bulk' END AS stock_hint",
});

export const finalGroupHaving = q({
  id: "final-group-having",
  title: "Final: GROUP BY + HAVING",
  prompt:
    "Return category and avg_price (rounded to 2 decimals) for categories whose average price is at least 100.",
  initialSQL: "SELECT category, ROUND(AVG(price), 2) AS avg_price\nFROM products\n",
  referenceSQL:
    "SELECT category, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category HAVING AVG(price) >= 100",
  expectedColumns: ["category", "avg_price"],
  successFeedback: "HAVING filters on the aggregate after GROUP BY.",
  failureFeedback: "GROUP BY category HAVING AVG(price) >= 100",
  hint: "HAVING AVG(price) >= 100",
});

export const finalInnerJoin = q({
  id: "final-inner-join",
  title: "Final: INNER JOIN",
  prompt: "Return customer and ordered_at for every order.",
  initialSQL: "SELECT c.name AS customer, o.ordered_at\nFROM customers c\n",
  referenceSQL:
    "SELECT c.name AS customer, o.ordered_at FROM customers c INNER JOIN orders o ON o.customer_id = c.id",
  expectedColumns: ["customer", "ordered_at"],
  successFeedback: "INNER JOIN links each order to its customer.",
  failureFeedback: "JOIN orders on customer_id.",
  hint: "INNER JOIN orders o ON o.customer_id = c.id",
});

export const finalLeftJoinNoOrders = q({
  id: "final-left-join-no-orders",
  title: "Final: LEFT JOIN",
  prompt: "Return names of customers with no orders.",
  initialSQL: "SELECT c.name\nFROM customers c\n",
  referenceSQL:
    "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
  expectedColumns: ["name"],
  successFeedback: "LEFT JOIN + IS NULL finds unmatched customers.",
  failureFeedback: "LEFT JOIN and WHERE o.id IS NULL",
  hint: "LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
});

export const finalSubqueryAvg = q({
  id: "final-subquery-avg",
  title: "Final: subquery",
  prompt: "Return products with price greater than the average price (name, price).",
  initialSQL: "SELECT name, price\nFROM products\nWHERE ",
  referenceSQL:
    "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products)",
  expectedColumns: ["name", "price"],
  successFeedback: "Compare each row to a scalar subquery aggregate.",
  failureFeedback: "WHERE price > (SELECT AVG(price) FROM products)",
  hint: "WHERE price > (SELECT AVG(price) FROM products)",
});

export const finalCte = q({
  id: "final-cte",
  title: "Final: CTE",
  prompt:
    "With CTE recent for orders on or after 2024-07-15, return customer_id and ordered_at from recent ordered by ordered_at.",
  initialSQL: "WITH recent AS (\n  SELECT * FROM orders WHERE ordered_at >= '2024-07-15'\n)\nSELECT ",
  referenceSQL:
    "WITH recent AS (SELECT * FROM orders WHERE ordered_at >= '2024-07-15') SELECT customer_id, ordered_at FROM recent ORDER BY ordered_at",
  requiresOrder: true,
  expectedColumns: ["customer_id", "ordered_at"],
  successFeedback: "CTEs name intermediate filters so the outer query stays short.",
  failureFeedback: "CTE recent for ordered_at >= 2024-07-15, then SELECT customer_id, ordered_at ORDER BY ordered_at.",
  hint: "WITH recent AS (...) SELECT customer_id, ordered_at FROM recent ORDER BY ordered_at",
});

export const finalWindowRank = q({
  id: "final-window-rank",
  title: "Final: window rank",
  prompt:
    "Return name, category, price, and category_rank using DENSE_RANK() partitioned by category ordered by price DESC.",
  initialSQL: "SELECT name, category, price,\n  DENSE_RANK() OVER (",
  referenceSQL:
    "SELECT name, category, price, DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank FROM products",
  requiresOrder: true,
  expectedColumns: ["name", "category", "price", "category_rank"],
  successFeedback:
    "DENSE_RANK numbers within each category without leaving gaps after ties.",
  failureFeedback: "DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC)",
  hint: "DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS category_rank",
});

export const finalAssessmentChallenges: SqlChallengeDefinition[] = [
  finalSelectFilterSort,
  finalTopN,
  finalCaseClassify,
  finalGroupHaving,
  finalInnerJoin,
  finalLeftJoinNoOrders,
  finalSubqueryAvg,
  finalCte,
  finalWindowRank,
];
