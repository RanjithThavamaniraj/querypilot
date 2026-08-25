import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const customerOrderInfo = q({
  id: "customer-order-info",
  title: "Customer and order info",
  prompt:
    "Return customer name, order id as order_id, and ordered_at for every order (INNER JOIN).",
  initialSQL: "SELECT c.name, o.id AS order_id, o.ordered_at\nFROM customers c\n",
  referenceSQL:
    "SELECT c.name, o.id AS order_id, o.ordered_at FROM customers c INNER JOIN orders o ON o.customer_id = c.id",
  expectedColumns: ["name", "order_id", "ordered_at"],
  successFeedback:
    "INNER JOIN keeps rows that match on both sides. customer_id ties each order to a customer.",
  failureFeedback: "INNER JOIN customers to orders on customer_id.",
  hint: "INNER JOIN orders o ON o.customer_id = c.id",
});

export const ordersWithProducts = q({
  id: "orders-with-products",
  title: "Orders with products",
  prompt:
    "Return order id as order_id, product name as product, and quantity for every order.",
  initialSQL: "SELECT o.id AS order_id, p.name AS product, o.quantity\nFROM orders o\n",
  referenceSQL:
    "SELECT o.id AS order_id, p.name AS product, o.quantity FROM orders o INNER JOIN products p ON o.product_id = p.id",
  expectedColumns: ["order_id", "product", "quantity"],
  successFeedback:
    "Joining orders to products replaces product_id with the readable product name.",
  failureFeedback: "Join orders to products on product_id.",
  hint: "INNER JOIN products p ON o.product_id = p.id",
});

export const customerProductPurchases = q({
  id: "customer-product-purchases",
  title: "Customer product purchases",
  prompt:
    "Return customer, product, and quantity by joining customers, orders, and products.",
  initialSQL:
    "SELECT c.name AS customer, p.name AS product, o.quantity\nFROM customers c\n",
  referenceSQL:
    "SELECT c.name AS customer, p.name AS product, o.quantity FROM customers c INNER JOIN orders o ON o.customer_id = c.id INNER JOIN products p ON o.product_id = p.id",
  expectedColumns: ["customer", "product", "quantity"],
  successFeedback:
    "Multi-table joins follow the foreign keys: customers → orders → products.",
  failureFeedback: "Join all three tables using customer_id and product_id.",
  hint: "JOIN orders on customer_id, then JOIN products on product_id",
});

export const customersWithNoOrders = q({
  id: "customers-with-no-orders",
  title: "Customers with no orders",
  prompt: "Return the names of customers who have never placed an order.",
  initialSQL: "SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON ",
  referenceSQL:
    "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
  expectedColumns: ["name"],
  successFeedback:
    "LEFT JOIN keeps customers even when no order matches. WHERE o.id IS NULL finds the unmatched ones.",
  failureFeedback: "LEFT JOIN orders and keep rows where the order side is NULL.",
  hint: "LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
});

export const productsWithNoOrders = q({
  id: "products-with-no-orders",
  title: "Products with no orders",
  prompt: "Return product names that never appear in orders.",
  initialSQL: "SELECT p.name\nFROM products p\nLEFT JOIN orders o ON ",
  referenceSQL:
    "SELECT p.name FROM products p LEFT JOIN orders o ON o.product_id = p.id WHERE o.id IS NULL",
  expectedColumns: ["name"],
  successFeedback:
    "The same LEFT JOIN + IS NULL pattern finds products that were never purchased.",
  failureFeedback: "LEFT JOIN orders on product_id and filter WHERE o.id IS NULL.",
  hint: "LEFT JOIN orders o ON o.product_id = p.id WHERE o.id IS NULL",
});

export const orderCountsByCountry = q({
  id: "order-counts-by-country",
  title: "Orders by country",
  prompt:
    "Return country and order_count: how many orders come from customers in each country.",
  initialSQL: "SELECT c.country, COUNT(*) AS order_count\nFROM customers c\n",
  referenceSQL:
    "SELECT c.country, COUNT(*) AS order_count FROM customers c INNER JOIN orders o ON o.customer_id = c.id GROUP BY c.country",
  expectedColumns: ["country", "order_count"],
  successFeedback:
    "Join first to connect orders to countries, then GROUP BY country to count.",
  failureFeedback: "Join customers to orders, GROUP BY country, COUNT(*).",
  hint: "INNER JOIN orders ... GROUP BY c.country",
});

export const multiTableJoinFiltered = q({
  id: "multi-table-join-filtered",
  title: "Filtered multi-table join",
  prompt:
    "Return customer and product for orders from India customers only.",
  initialSQL:
    "SELECT c.name AS customer, p.name AS product\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN products p ON o.product_id = p.id\n",
  referenceSQL:
    "SELECT c.name AS customer, p.name AS product FROM customers c JOIN orders o ON o.customer_id = c.id JOIN products p ON o.product_id = p.id WHERE c.country = 'India'",
  expectedColumns: ["customer", "product"],
  successFeedback:
    "Join connects the tables; WHERE filters the joined result to India customers.",
  failureFeedback: "Join all three tables and WHERE c.country = 'India'.",
  hint: "WHERE c.country = 'India'",
});

export const joinChallenges: SqlChallengeDefinition[] = [
  customerOrderInfo,
  ordersWithProducts,
  customerProductPurchases,
  customersWithNoOrders,
  productsWithNoOrders,
  orderCountsByCountry,
  multiTableJoinFiltered,
];
