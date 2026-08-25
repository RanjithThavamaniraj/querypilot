import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const productsAboveAveragePrice = q({
  id: "products-above-average-price",
  title: "Products above average price",
  prompt: "Return name and price for products priced above the average product price.",
  initialSQL: "SELECT name, price\nFROM products\nWHERE price > ",
  referenceSQL:
    "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products)",
  expectedColumns: ["name", "price"],
  successFeedback:
    "The subquery computes one average. The outer query compares each product to that scalar value.",
  failureFeedback: "Compare price to (SELECT AVG(price) FROM products).",
  hint: "WHERE price > (SELECT AVG(price) FROM products)",
});

export const customersWhoPlacedOrders = q({
  id: "customers-who-placed-orders",
  title: "Customers who placed orders",
  prompt: "Return names of customers whose id appears in orders (use IN).",
  initialSQL: "SELECT name\nFROM customers\nWHERE id IN ",
  referenceSQL:
    "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders)",
  expectedColumns: ["name"],
  successFeedback:
    "IN checks membership in a list. The subquery builds that list of customer_id values.",
  failureFeedback: "WHERE id IN (SELECT customer_id FROM orders)",
  hint: "WHERE id IN (SELECT customer_id FROM orders)",
});

export const customersWhoNeverOrdered = q({
  id: "customers-who-never-ordered",
  title: "Customers who never ordered",
  prompt: "Return names of customers who never appear in orders (use NOT IN or NOT EXISTS).",
  initialSQL: "SELECT name\nFROM customers\nWHERE ",
  referenceSQL:
    "SELECT name FROM customers WHERE id NOT IN (SELECT customer_id FROM orders)",
  expectedColumns: ["name"],
  successFeedback:
    "NOT IN / NOT EXISTS finds customers missing from the orders list—Yuki Tanaka and Guest User in this dataset.",
  failureFeedback: "Exclude customers whose id appears in orders.",
  hint: "WHERE id NOT IN (SELECT customer_id FROM orders)",
});

export const highestPricedProduct = q({
  id: "highest-priced-product",
  title: "Highest-priced product",
  prompt: "Return the product row(s) whose price equals the maximum price.",
  initialSQL: "SELECT *\nFROM products\nWHERE price = ",
  referenceSQL:
    "SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products)",
  successFeedback:
    "A scalar subquery with MAX finds the peak price; the outer query returns matching product rows.",
  failureFeedback: "WHERE price = (SELECT MAX(price) FROM products)",
  hint: "WHERE price = (SELECT MAX(price) FROM products)",
});

export const existsCustomersWithOrders = q({
  id: "exists-customers-with-orders",
  title: "EXISTS customers with orders",
  prompt: "Return customer names that have at least one order using EXISTS.",
  initialSQL: "SELECT name\nFROM customers c\nWHERE EXISTS ",
  referenceSQL:
    "SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
  expectedColumns: ["name"],
  successFeedback:
    "EXISTS is true when the subquery finds any matching row. It is often clearer than joining just to test presence.",
  failureFeedback: "Use EXISTS with a correlated subquery on customer_id.",
  hint: "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
});

export const notExistsNoOrders = q({
  id: "not-exists-no-orders",
  title: "NOT EXISTS no orders",
  prompt: "Return customer names with no orders using NOT EXISTS.",
  initialSQL: "SELECT name\nFROM customers c\nWHERE NOT EXISTS ",
  referenceSQL:
    "SELECT name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
  expectedColumns: ["name"],
  successFeedback:
    "NOT EXISTS is the natural opposite of EXISTS—and handles the “no related rows” case cleanly.",
  failureFeedback: "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
  hint: "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
});

export const subqueryChallenges: SqlChallengeDefinition[] = [
  productsAboveAveragePrice,
  customersWhoPlacedOrders,
  customersWhoNeverOrdered,
  highestPricedProduct,
  existsCustomersWithOrders,
  notExistsNoOrders,
];
