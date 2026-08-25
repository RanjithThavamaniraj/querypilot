import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const countCustomers = q({
  id: "count-customers",
  title: "Count customers",
  prompt: "Return a single column customer_count with the number of customers.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT COUNT(*) AS customer_count FROM customers",
  expectedColumns: ["customer_count"],
  successFeedback:
    "COUNT(*) counts rows. Aggregates collapse the table into a summary.",
  failureFeedback: "Use COUNT(*) AS customer_count.",
  hint: "SELECT COUNT(*) AS customer_count FROM customers;",
});

export const countOrders = q({
  id: "count-orders",
  title: "Count orders",
  prompt: "Return order_count, the number of orders.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT COUNT(*) AS order_count FROM orders",
  expectedColumns: ["order_count"],
  successFeedback: "COUNT(*) on orders tells you how many purchases were recorded.",
  failureFeedback: "SELECT COUNT(*) AS order_count FROM orders;",
  hint: "SELECT COUNT(*) AS order_count FROM orders;",
});

export const averageProductPrice = q({
  id: "average-product-price",
  title: "Average product price",
  prompt: "Return avg_price as the average product price rounded to 2 decimals.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT ROUND(AVG(price), 2) AS avg_price FROM products",
  expectedColumns: ["avg_price"],
  successFeedback: "AVG computes the mean. ROUND keeps the result readable.",
  failureFeedback: "Use ROUND(AVG(price), 2) AS avg_price.",
  hint: "SELECT ROUND(AVG(price), 2) AS avg_price FROM products;",
});

export const totalOrderQuantities = q({
  id: "total-order-quantities",
  title: "Total order quantities",
  prompt: "Return total_quantity, the sum of quantity across all orders.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT SUM(quantity) AS total_quantity FROM orders",
  expectedColumns: ["total_quantity"],
  successFeedback: "SUM adds numeric values. Here it totals units sold.",
  failureFeedback: "SELECT SUM(quantity) AS total_quantity FROM orders;",
  hint: "SELECT SUM(quantity) AS total_quantity FROM orders;",
});

export const cheapestProduct = q({
  id: "cheapest-product",
  title: "Cheapest product",
  prompt: "Return min_price, the lowest product price.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT MIN(price) AS min_price FROM products",
  expectedColumns: ["min_price"],
  successFeedback: "MIN finds the smallest value. MAX would find the largest.",
  failureFeedback: "SELECT MIN(price) AS min_price FROM products;",
  hint: "SELECT MIN(price) AS min_price FROM products;",
});

export const ordersPerCustomer = q({
  id: "orders-per-customer",
  title: "Orders per customer",
  prompt:
    "Return customer_id and order_count (how many orders each customer_id has).",
  initialSQL: "SELECT customer_id, ",
  referenceSQL:
    "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id",
  expectedColumns: ["customer_id", "order_count"],
  successFeedback:
    "GROUP BY customer_id makes one row per customer. COUNT(*) then counts that group.",
  failureFeedback: "GROUP BY customer_id and COUNT(*) AS order_count.",
  hint: "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id;",
});

export const productsPerCategory = q({
  id: "products-per-category",
  title: "Products per category",
  prompt: "Return category and product_count for each product category.",
  initialSQL: "SELECT category, ",
  referenceSQL:
    "SELECT category, COUNT(*) AS product_count FROM products GROUP BY category",
  expectedColumns: ["category", "product_count"],
  successFeedback: "Each unique category becomes a group; COUNT(*) sizes the group.",
  failureFeedback: "GROUP BY category with COUNT(*) AS product_count.",
  hint: "SELECT category, COUNT(*) AS product_count FROM products GROUP BY category;",
});

export const categoriesAboveThreshold = q({
  id: "categories-above-threshold",
  title: "Groups above a threshold",
  prompt:
    "Return category and product_count for categories that have at least 3 products.",
  initialSQL: "SELECT category, COUNT(*) AS product_count\nFROM products\nGROUP BY category\n",
  referenceSQL:
    "SELECT category, COUNT(*) AS product_count FROM products GROUP BY category HAVING COUNT(*) >= 3",
  expectedColumns: ["category", "product_count"],
  successFeedback:
    "HAVING filters groups after aggregation. WHERE cannot test COUNT(*) because rows are not grouped yet.",
  failureFeedback: "GROUP BY category and HAVING COUNT(*) >= 3.",
  hint: "HAVING COUNT(*) >= 3",
});

export const indiaCustomerCount = q({
  id: "india-customer-count",
  title: "WHERE then aggregate",
  prompt:
    "Count customers in India. Return country and customer_count (should be one row: India).",
  initialSQL: "SELECT country, COUNT(*) AS customer_count\nFROM customers\n",
  referenceSQL:
    "SELECT country, COUNT(*) AS customer_count FROM customers WHERE country = 'India' GROUP BY country",
  expectedColumns: ["country", "customer_count"],
  successFeedback:
    "WHERE drops non-India rows first. GROUP BY country then counts the remaining group.",
  failureFeedback: "Filter to India with WHERE, then GROUP BY country.",
  hint: "WHERE country = 'India' GROUP BY country",
});

export const aggregationChallenges: SqlChallengeDefinition[] = [
  countCustomers,
  countOrders,
  averageProductPrice,
  totalOrderQuantities,
  cheapestProduct,
  ordersPerCustomer,
  productsPerCategory,
  categoriesAboveThreshold,
  indiaCustomerCount,
];
