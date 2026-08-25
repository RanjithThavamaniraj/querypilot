import type { SqlChallengeDefinition } from "@/lib/learn/types";

export const selectAllCustomers: SqlChallengeDefinition = {
  id: "select-all-customers",
  title: "Select all customers",
  prompt: "Write a query that returns every row from the customers table.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT * FROM customers",
  requiresOrder: false,
  successFeedback:
    "That works because SELECT * asks PostgreSQL for every column from customers, and FROM customers tells PostgreSQL which table to read.",
  failureFeedback:
    "Your result does not match all rows from customers. Use SELECT * FROM customers;",
  hint: "Start with SELECT * FROM customers;",
};

export const selectCustomerNames: SqlChallengeDefinition = {
  id: "select-customer-names",
  title: "Select customer names",
  prompt: "Return only the name column from customers.",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT name FROM customers",
  requiresOrder: false,
  expectedColumns: ["name"],
  successFeedback:
    "Selecting specific columns keeps results focused. PostgreSQL returned only name because that is what you listed after SELECT.",
  failureFeedback:
    "Return exactly the name column from customers—no other columns.",
  hint: "SELECT name FROM customers;",
};

export const customersFromIndia: SqlChallengeDefinition = {
  id: "customers-from-india",
  title: "Customers from India",
  prompt: "Return all customers whose country is India.",
  initialSQL: "SELECT *\nFROM customers\nWHERE ",
  referenceSQL: "SELECT * FROM customers WHERE country = 'India'",
  requiresOrder: false,
  successFeedback:
    "WHERE filters rows. country = 'India' keeps only matching customers. Text values need single quotes.",
  failureFeedback:
    "Filter customers so only rows with country = 'India' remain.",
  hint: "WHERE country = 'India'",
};

export const distinctCountries: SqlChallengeDefinition = {
  id: "distinct-countries",
  title: "Distinct countries",
  prompt: "Return each unique country from customers (no duplicates).",
  initialSQL: "SELECT ",
  referenceSQL: "SELECT DISTINCT country FROM customers",
  requiresOrder: false,
  expectedColumns: ["country"],
  successFeedback:
    "DISTINCT removes duplicate values from the result. Several customers share a country, so DISTINCT country returns each country once.",
  failureFeedback:
    "Return unique country values only. Look at DISTINCT.",
  hint: "SELECT DISTINCT country FROM customers;",
};

export const checkpointFilterAnd: SqlChallengeDefinition = {
  id: "checkpoint-filter-and",
  title: "Filter with AND",
  prompt:
    "Return the name and country of customers from India whose name is Priya Sharma.",
  initialSQL: "SELECT name, country\nFROM customers\nWHERE ",
  referenceSQL:
    "SELECT name, country FROM customers WHERE country = 'India' AND name = 'Priya Sharma'",
  requiresOrder: false,
  expectedColumns: ["name", "country"],
  successFeedback:
    "AND requires every condition to be true. Both country and name had to match before a row appeared.",
  failureFeedback:
    "Select name and country for the India customer named Priya Sharma.",
  hint: "WHERE country = 'India' AND name = 'Priya Sharma'",
};

export const productsHighestPrice: SqlChallengeDefinition = {
  id: "products-highest-price",
  title: "Products by highest price",
  prompt:
    "Return every product ordered by price from highest to lowest.",
  initialSQL: "SELECT *\nFROM products\nORDER BY ",
  referenceSQL: "SELECT * FROM products ORDER BY price DESC",
  requiresOrder: true,
  successFeedback:
    "ORDER BY price DESC sorts so the largest price comes first. Without DESC, PostgreSQL would use ASC and put cheap products on top.",
  failureFeedback:
    "Return all products sorted by price descending (highest first).",
  hint: "ORDER BY price DESC",
};

export const customersAlphabetical: SqlChallengeDefinition = {
  id: "customers-alphabetical",
  title: "Customers alphabetically",
  prompt: "Return every customer ordered alphabetically by name (A→Z).",
  initialSQL: "SELECT *\nFROM customers\nORDER BY ",
  referenceSQL: "SELECT * FROM customers ORDER BY name",
  requiresOrder: true,
  successFeedback:
    "ORDER BY name (ASC by default) makes alphabetical order reliable. Without ORDER BY, you cannot trust name order.",
  failureFeedback:
    "Return all customers sorted by name ascending.",
  hint: "ORDER BY name",
};

export const latestOrders: SqlChallengeDefinition = {
  id: "latest-orders",
  title: "Latest orders",
  prompt: "Return every order with the most recent orders first.",
  initialSQL: "SELECT *\nFROM orders\nORDER BY ",
  referenceSQL: "SELECT * FROM orders ORDER BY ordered_at DESC",
  requiresOrder: true,
  successFeedback:
    "ORDER BY ordered_at DESC puts the newest dates at the top—exactly what “latest” means in SQL.",
  failureFeedback:
    "Return all orders sorted by ordered_at descending (newest first).",
  hint: "ORDER BY ordered_at DESC",
};

export const topThreeProducts: SqlChallengeDefinition = {
  id: "top-three-products",
  title: "Top three products",
  prompt: "Return the three most expensive products (highest price first).",
  initialSQL: "SELECT *\nFROM products\nORDER BY ",
  referenceSQL: "SELECT * FROM products ORDER BY price DESC LIMIT 3",
  requiresOrder: true,
  successFeedback:
    "ORDER BY price DESC ranks products; LIMIT 3 keeps only the top of that ranked list. Top-N needs both clauses.",
  failureFeedback:
    "Sort products by price descending and keep only three rows.",
  hint: "ORDER BY price DESC LIMIT 3",
};

export const indiaCustomersSorted: SqlChallengeDefinition = {
  id: "india-customers-sorted",
  title: "Indian customers sorted",
  prompt:
    "Return customers from India, sorted alphabetically by name.",
  initialSQL: "SELECT *\nFROM customers\nWHERE ",
  referenceSQL:
    "SELECT * FROM customers WHERE country = 'India' ORDER BY name",
  requiresOrder: true,
  successFeedback:
    "WHERE keeps only India, then ORDER BY name sorts that filtered set. Filtering and sorting solve different jobs.",
  failureFeedback:
    "Filter to country = 'India', then sort by name ascending.",
  hint: "WHERE country = 'India' ORDER BY name",
};

export const productsPage: SqlChallengeDefinition = {
  id: "products-page",
  title: "Products page (LIMIT + OFFSET)",
  prompt:
    "Return products ordered by price ascending. Skip the first 3 rows and return the next 3 (LIMIT 3 OFFSET 3).",
  initialSQL: "SELECT *\nFROM products\nORDER BY price ASC\n",
  referenceSQL:
    "SELECT * FROM products ORDER BY price ASC LIMIT 3 OFFSET 3",
  requiresOrder: true,
  successFeedback:
    "OFFSET 3 skips the three cheapest products after sorting; LIMIT 3 returns the next page. ORDER BY makes that page stable.",
  failureFeedback:
    "Sort by price ascending, skip 3 rows, then return 3 rows.",
  hint: "ORDER BY price ASC LIMIT 3 OFFSET 3",
};

export const sqlChallenges: SqlChallengeDefinition[] = [
  selectAllCustomers,
  selectCustomerNames,
  customersFromIndia,
  distinctCountries,
  checkpointFilterAnd,
  productsHighestPrice,
  customersAlphabetical,
  latestOrders,
  topThreeProducts,
  indiaCustomersSorted,
  productsPage,
];
