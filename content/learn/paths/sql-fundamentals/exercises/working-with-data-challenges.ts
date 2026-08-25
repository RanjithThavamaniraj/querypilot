import type { SqlChallengeDefinition } from "@/lib/learn/types";

function writeChallenge(
  challenge: Omit<SqlChallengeDefinition, "requiresOrder" | "datasetId"> &
    Partial<Pick<SqlChallengeDefinition, "requiresOrder" | "datasetId">>
): SqlChallengeDefinition {
  return { requiresOrder: true, datasetId: "shop", ...challenge };
}

export const insertACustomer = writeChallenge({
  id: "insert-a-customer",
  title: "Insert a customer",
  prompt:
    "Insert a customer with id 20, name Rita Lopez, email rita@example.com, country Mexico, and created_at 2024-09-01.",
  initialSQL: "INSERT INTO customers (id, name, email, country, created_at)\nVALUES ",
  referenceSQL:
    "INSERT INTO customers (id, name, email, country, created_at)\nVALUES (20, 'Rita Lopez', 'rita@example.com', 'Mexico', '2024-09-01')",
  inspectSQL: "SELECT id, name, email, country, created_at FROM customers WHERE id = 20",
  expectedColumns: ["id", "name", "email", "country", "created_at"],
  successFeedback:
    "INSERT adds a row. QueryPilot applied it on a private copy, then checked that Rita Lopez exists with the values you provided.",
  failureFeedback:
    "Insert id 20 with name Rita Lopez, email rita@example.com, country Mexico, and created_at 2024-09-01.",
  hint: "INSERT INTO customers (id, name, email, country, created_at) VALUES (20, 'Rita Lopez', 'rita@example.com', 'Mexico', '2024-09-01');",
});

export const insertMultipleProducts = writeChallenge({
  id: "insert-multiple-products",
  title: "Insert multiple products",
  prompt:
    "Insert two products in one statement: id 20 USB Cable (Accessories, 9.99) and id 21 HDMI Cable (Accessories, 12.50).",
  initialSQL: "INSERT INTO products (id, name, category, price)\nVALUES\n  ",
  referenceSQL:
    "INSERT INTO products (id, name, category, price) VALUES (20, 'USB Cable', 'Accessories', 9.99), (21, 'HDMI Cable', 'Accessories', 12.50)",
  inspectSQL: "SELECT id, name, category, price FROM products WHERE id IN (20, 21) ORDER BY id",
  expectedColumns: ["id", "name", "category", "price"],
  successFeedback:
    "One INSERT can add several rows. Separate value lists with commas.",
  failureFeedback: "Insert both products (ids 20 and 21) in a single INSERT.",
  hint: "VALUES (20, 'USB Cable', 'Accessories', 9.99), (21, 'HDMI Cable', 'Accessories', 12.50)",
});

export const updateCustomerCountry = writeChallenge({
  id: "update-customer-country",
  title: "Update a customer's country",
  prompt: "Change Chloe Martin’s country to Portugal.",
  initialSQL: "UPDATE customers\nSET ",
  referenceSQL: "UPDATE customers SET country = 'Portugal' WHERE name = 'Chloe Martin'",
  inspectSQL: "SELECT name, country FROM customers ORDER BY name",
  expectedColumns: ["name", "country"],
  successFeedback:
    "UPDATE changes existing rows. WHERE limited the change to Chloe Martin so other customers kept their country.",
  failureFeedback: "Set country to Portugal only for Chloe Martin.",
  hint: "UPDATE customers SET country = 'Portugal' WHERE name = 'Chloe Martin';",
});

export const updateProductPrices = writeChallenge({
  id: "update-product-prices",
  title: "Update product prices",
  prompt: "Increase every Audio product’s price by 5.00.",
  initialSQL: "UPDATE products\nSET ",
  referenceSQL: "UPDATE products SET price = price + 5 WHERE category = 'Audio'",
  inspectSQL: "SELECT name, category, price FROM products ORDER BY name",
  expectedColumns: ["name", "category", "price"],
  successFeedback:
    "You can compute a new value from the old one: price = price + 5. WHERE category = 'Audio' kept other products unchanged.",
  failureFeedback: "Add 5 only to products in the Audio category.",
  hint: "SET price = price + 5 WHERE category = 'Audio'",
});

export const deleteTestRecord = writeChallenge({
  id: "delete-test-record",
  title: "Delete a test record",
  prompt: "Delete the product named Gift Card. Leave every other product in place.",
  initialSQL: "DELETE FROM products\nWHERE ",
  referenceSQL: "DELETE FROM products WHERE name = 'Gift Card'",
  inspectSQL: "SELECT name FROM products ORDER BY name",
  expectedColumns: ["name"],
  successFeedback:
    "DELETE removes matching rows. WHERE name = 'Gift Card' deleted one test product and left the rest.",
  failureFeedback:
    "Delete only Gift Card. A DELETE without WHERE would wipe the table.",
  hint: "DELETE FROM products WHERE name = 'Gift Card';",
});

export const transactionCommit = writeChallenge({
  id: "transaction-commit",
  title: "Commit a transaction",
  prompt:
    "In one script: BEGIN, insert customer id 30 named Txn User (email txn@example.com, country Kenya, created_at 2024-09-02), then COMMIT.",
  initialSQL: "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at)\nVALUES ",
  referenceSQL:
    "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at) VALUES (30, 'Txn User', 'txn@example.com', 'Kenya', '2024-09-02');\nCOMMIT;",
  inspectSQL: "SELECT id, name, country FROM customers WHERE id = 30",
  expectedColumns: ["id", "name", "country"],
  successFeedback:
    "COMMIT makes the insert visible for the rest of this practice session. QueryPilot still discards the private copy afterward so the shared shop data stays safe.",
  failureFeedback: "BEGIN, insert Txn User as id 30, then COMMIT.",
  hint: "BEGIN; INSERT ... VALUES (30, 'Txn User', ...); COMMIT;",
});

export const transactionRollback = writeChallenge({
  id: "transaction-rollback",
  title: "Rollback a transaction",
  prompt:
    "BEGIN, insert customer id 31 named Gone User (email gone@example.com, country Kenya, created_at 2024-09-02), then ROLLBACK. The customer must not remain.",
  initialSQL: "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at)\nVALUES ",
  referenceSQL:
    "BEGIN;\nINSERT INTO customers (id, name, email, country, created_at) VALUES (31, 'Gone User', 'gone@example.com', 'Kenya', '2024-09-02');\nROLLBACK;",
  inspectSQL: "SELECT COUNT(*)::int AS remaining FROM customers WHERE id = 31",
  expectedColumns: ["remaining"],
  successFeedback:
    "ROLLBACK undoes the insert. After ROLLBACK, id 31 is gone—that is the point of a transaction you decide not to keep.",
  failureFeedback:
    "Insert Gone User inside a transaction and ROLLBACK so id 31 does not remain.",
  hint: "END the script with ROLLBACK, not COMMIT.",
});

export const workingWithDataChallenges: SqlChallengeDefinition[] = [
  insertACustomer,
  insertMultipleProducts,
  updateCustomerCountry,
  updateProductPrices,
  deleteTestRecord,
  transactionCommit,
  transactionRollback,
];
