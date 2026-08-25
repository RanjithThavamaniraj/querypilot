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

export const sqlChallenges: SqlChallengeDefinition[] = [
  selectAllCustomers,
  selectCustomerNames,
  customersFromIndia,
  distinctCountries,
  checkpointFilterAnd,
];
