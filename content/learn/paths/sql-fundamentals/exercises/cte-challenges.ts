import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const cteExpensiveProducts = q({
  id: "cte-expensive-products",
  title: "CTE for expensive products",
  prompt:
    "Using a CTE named expensive for products with price >= 100, return name and price ordered by price descending.",
  initialSQL: "WITH expensive AS (\n  SELECT * FROM products WHERE price >= 100\n)\nSELECT ",
  referenceSQL:
    "WITH expensive AS (SELECT * FROM products WHERE price >= 100) SELECT name, price FROM expensive ORDER BY price DESC",
  requiresOrder: true,
  expectedColumns: ["name", "price"],
  successFeedback:
    "WITH names an intermediate result. The outer SELECT reads from expensive like a temporary table.",
  failureFeedback: "Define CTE expensive for price >= 100, then SELECT name, price ORDER BY price DESC.",
  hint: "WITH expensive AS (...) SELECT name, price FROM expensive ORDER BY price DESC",
});

export const cteCustomerOrderCounts = q({
  id: "cte-customer-order-counts",
  title: "CTE customer order counts",
  prompt:
    "With a CTE order_counts(customer_id, order_count), return customer names and order_count for customers with at least one order.",
  initialSQL:
    "WITH order_counts AS (\n  SELECT customer_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT ",
  referenceSQL:
    "WITH order_counts AS (SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id) SELECT c.name, oc.order_count FROM customers c JOIN order_counts oc ON oc.customer_id = c.id",
  expectedColumns: ["name", "order_count"],
  successFeedback:
    "The CTE aggregates first. The outer query joins that summary back to customer names.",
  failureFeedback: "Aggregate in a CTE, then JOIN customers to that CTE.",
  hint: "JOIN order_counts oc ON oc.customer_id = c.id",
});

export const cteJoinFiltered = q({
  id: "cte-join-filtered",
  title: "Filter a CTE join",
  prompt:
    "Using a CTE india_customers for customers in India, return their names and order ids (order_id) for any orders they placed.",
  initialSQL:
    "WITH india_customers AS (\n  SELECT * FROM customers WHERE country = 'India'\n)\nSELECT ",
  referenceSQL:
    "WITH india_customers AS (SELECT * FROM customers WHERE country = 'India') SELECT ic.name, o.id AS order_id FROM india_customers ic JOIN orders o ON o.customer_id = ic.id",
  expectedColumns: ["name", "order_id"],
  successFeedback:
    "CTEs keep the India filter readable. The join then attaches only those customers’ orders.",
  failureFeedback: "CTE for India customers, then JOIN orders.",
  hint: "FROM india_customers ic JOIN orders o ON o.customer_id = ic.id",
});

export const recursiveCountdown = q({
  id: "recursive-countdown",
  title: "Recursive CTE intro",
  prompt:
    "Write a recursive CTE named n that produces values 1 through 5 as value, and return those rows ordered by value.",
  initialSQL: "WITH RECURSIVE n AS (\n  SELECT 1 AS value\n  UNION ALL\n  SELECT ",
  referenceSQL:
    "WITH RECURSIVE n AS (SELECT 1 AS value UNION ALL SELECT value + 1 FROM n WHERE value < 5) SELECT value FROM n ORDER BY value",
  requiresOrder: true,
  expectedColumns: ["value"],
  successFeedback:
    "Recursive CTEs start with an anchor row, then repeatedly add rows until the WHERE stops them. This is an introduction—not everyday SQL.",
  failureFeedback: "Anchor SELECT 1, then UNION ALL SELECT value + 1 ... WHERE value < 5.",
  hint: "WITH RECURSIVE n AS (SELECT 1 AS value UNION ALL SELECT value + 1 FROM n WHERE value < 5)",
});

export const cteChallenges: SqlChallengeDefinition[] = [
  cteExpensiveProducts,
  cteCustomerOrderCounts,
  cteJoinFiltered,
  recursiveCountdown,
];
