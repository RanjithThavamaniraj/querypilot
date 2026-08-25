export type ShopColumnMeta = {
  name: string;
  type: string;
  description: string;
};

export type ShopTableMeta = {
  name: string;
  description: string;
  columns: ShopColumnMeta[];
  sampleQuery: string;
  sampleRows: Record<string, string | number>[];
};

export const shopDatasetId = "shop" as const;

export const shopTables: ShopTableMeta[] = [
  {
    name: "customers",
    description: "People who buy from the shop.",
    columns: [
      { name: "id", type: "integer", description: "Unique customer id" },
      { name: "name", type: "text", description: "Customer full name" },
      { name: "email", type: "text", description: "Email address" },
      { name: "country", type: "text", description: "Country of residence" },
      { name: "created_at", type: "date", description: "When the customer signed up" },
    ],
    sampleQuery: "SELECT * FROM customers LIMIT 5;",
    sampleRows: [
      {
        id: 1,
        name: "Aisha Khan",
        email: "aisha@example.com",
        country: "India",
        created_at: "2024-01-12",
      },
      {
        id: 2,
        name: "Liam Chen",
        email: "liam@example.com",
        country: "Canada",
        created_at: "2024-02-03",
      },
      {
        id: 3,
        name: "Sofia Rossi",
        email: "sofia@example.com",
        country: "Italy",
        created_at: "2024-02-18",
      },
    ],
  },
  {
    name: "products",
    description: "Items available for purchase.",
    columns: [
      { name: "id", type: "integer", description: "Unique product id" },
      { name: "name", type: "text", description: "Product name" },
      { name: "category", type: "text", description: "Product category" },
      { name: "price", type: "numeric", description: "Unit price" },
    ],
    sampleQuery: "SELECT * FROM products LIMIT 5;",
    sampleRows: [
      { id: 1, name: "USB-C Hub", category: "Accessories", price: 29.99 },
      {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 89.0,
      },
      { id: 3, name: "14-inch Laptop", category: "Computers", price: 999.0 },
    ],
  },
  {
    name: "orders",
    description: "Purchases linking customers to products.",
    columns: [
      { name: "id", type: "integer", description: "Unique order id" },
      { name: "customer_id", type: "integer", description: "References customers.id" },
      { name: "product_id", type: "integer", description: "References products.id" },
      { name: "quantity", type: "integer", description: "How many units were bought" },
      { name: "ordered_at", type: "date", description: "Order date" },
    ],
    sampleQuery: "SELECT * FROM orders LIMIT 5;",
    sampleRows: [
      { id: 1, customer_id: 1, product_id: 2, quantity: 1, ordered_at: "2024-07-01" },
      { id: 2, customer_id: 1, product_id: 4, quantity: 2, ordered_at: "2024-07-03" },
      { id: 3, customer_id: 2, product_id: 3, quantity: 1, ordered_at: "2024-07-05" },
    ],
  },
];
