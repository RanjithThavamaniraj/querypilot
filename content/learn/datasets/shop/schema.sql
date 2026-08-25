-- Shop educational schema for QueryPilot Phase 2
-- Apply as lab provisioning/admin role only.

CREATE SCHEMA IF NOT EXISTS shop;

CREATE TABLE IF NOT EXISTS shop.customers (
  id integer PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  country text NOT NULL,
  created_at date NOT NULL
);

CREATE TABLE IF NOT EXISTS shop.products (
  id integer PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS shop.orders (
  id integer PRIMARY KEY,
  customer_id integer NOT NULL REFERENCES shop.customers (id),
  product_id integer NOT NULL REFERENCES shop.products (id),
  quantity integer NOT NULL,
  ordered_at date NOT NULL
);
