import type { SqlChallengeDefinition } from "@/lib/learn/types";

function q(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: false, datasetId: "shop", ...challenge };
}

export const formatCustomerNames = q({
  id: "format-customer-names",
  title: "Format customer names",
  prompt: "Return each customer name in uppercase as name_upper.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT UPPER(name) AS name_upper FROM customers",
  expectedColumns: ["name_upper"],
  successFeedback:
    "UPPER converts text to capitals. An alias (AS name_upper) labels the derived column.",
  failureFeedback: "Select UPPER(name) and alias it as name_upper.",
  hint: "SELECT UPPER(name) AS name_upper FROM customers;",
});

export const calculateProductValues = q({
  id: "calculate-product-values",
  title: "Calculate product values",
  prompt:
    "Return product name and a column called tax_price that is price * 1.1, rounded to 2 decimal places.",
  initialSQL: "SELECT name, ",
  referenceSQL: "SELECT name, ROUND(price * 1.1, 2) AS tax_price FROM products",
  expectedColumns: ["name", "tax_price"],
  successFeedback:
    "Expressions can compute new columns. ROUND(..., 2) keeps money-like values tidy.",
  failureFeedback: "Return name and ROUND(price * 1.1, 2) AS tax_price.",
  hint: "ROUND(price * 1.1, 2) AS tax_price",
});

export const classifyProductsCase = q({
  id: "classify-products-case",
  title: "Classify products with CASE",
  prompt:
    "Return name, price, and price_band: 'Budget' when price < 50, 'Mid' when price < 200, otherwise 'Premium'.",
  initialSQL: "SELECT name, price,\n  CASE\n    ",
  referenceSQL:
    "SELECT name, price, CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Mid' ELSE 'Premium' END AS price_band FROM products",
  expectedColumns: ["name", "price", "price_band"],
  successFeedback:
    "CASE labels each row. PostgreSQL tests WHEN clauses in order and uses the first match.",
  failureFeedback: "Add a CASE expression aliased as price_band with those three labels.",
  hint: "CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Mid' ELSE 'Premium' END AS price_band",
});

export const handleNullPhones = q({
  id: "handle-null-phones",
  title: "Handle NULL phone numbers",
  prompt:
    "Return name and a column phone_display that shows the phone, or 'No phone' when phone is NULL.",
  initialSQL: "SELECT name, ",
  referenceSQL:
    "SELECT name, COALESCE(phone, 'No phone') AS phone_display FROM customers",
  expectedColumns: ["name", "phone_display"],
  successFeedback:
    "COALESCE returns the first non-NULL value. NULL means unknown—not the same as an empty string.",
  failureFeedback: "Use COALESCE(phone, 'No phone') AS phone_display.",
  hint: "SELECT name, COALESCE(phone, 'No phone') AS phone_display FROM customers;",
});

export const nameLength = q({
  id: "name-length",
  title: "Name lengths",
  prompt: "Return name and name_length (character length of name) for every customer.",
  initialSQL: "SELECT name, ",
  referenceSQL: "SELECT name, LENGTH(name) AS name_length FROM customers",
  expectedColumns: ["name", "name_length"],
  successFeedback:
    "LENGTH counts characters. Functions in SELECT create extra result columns without changing stored data.",
  failureFeedback: "Select name and LENGTH(name) AS name_length.",
  hint: "SELECT name, LENGTH(name) AS name_length FROM customers;",
});

export const orderShipDates = q({
  id: "order-ship-dates",
  title: "Date expressions",
  prompt:
    "Return order id and ship_by, which is ordered_at plus 7 days, for every order.",
  initialSQL: "SELECT id, ",
  referenceSQL:
    "SELECT id, ordered_at + 7 AS ship_by FROM orders",
  expectedColumns: ["id", "ship_by"],
  successFeedback:
    "Adding a number to a date adds days. That is a simple, practical date expression.",
  failureFeedback: "Return id and ordered_at + 7 AS ship_by.",
  hint: "SELECT id, ordered_at + 7 AS ship_by FROM orders;",
});

export const functionChallenges: SqlChallengeDefinition[] = [
  formatCustomerNames,
  calculateProductValues,
  classifyProductsCase,
  handleNullPhones,
  nameLength,
  orderShipDates,
];
