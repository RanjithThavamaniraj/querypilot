-- Deterministic shop seed data for QueryPilot Phase 2
-- Apply as lab provisioning/admin role only.

TRUNCATE shop.orders, shop.products, shop.customers RESTART IDENTITY;

INSERT INTO shop.customers (id, name, email, country, created_at, phone) VALUES
  (1,  'Aisha Khan',     'aisha@example.com',   'India',         '2024-01-12', '555-0101'),
  (2,  'Liam Chen',      'liam@example.com',    'Canada',        '2024-02-03', '555-0102'),
  (3,  'Sofia Rossi',    'sofia@example.com',   'Italy',         '2024-02-18', NULL),
  (4,  'Noah Patel',     'noah@example.com',    'India',         '2024-03-01', '555-0104'),
  (5,  'Emma Johansson', 'emma@example.com',    'Sweden',        '2024-03-14', NULL),
  (6,  'Mateo Garcia',   'mateo@example.com',   'Spain',         '2024-04-02', '  555-0106  '),
  (7,  'Priya Sharma',   'priya@example.com',   'India',         '2024-04-21', '555-0107'),
  (8,  'James Okonkwo',  'james@example.com',   'Nigeria',       '2024-05-09', NULL),
  (9,  'Hana Suzuki',    'hana@example.com',    'Japan',         '2024-05-27', '555-0109'),
  (10, 'Olivia Brown',   'olivia@example.com',  'United States', '2024-06-11', NULL),
  (11, 'Arjun Mehta',    'arjun@example.com',   'India',         '2024-06-30', '555-0111'),
  (12, 'Chloe Martin',   'chloe@example.com',   'France',        '2024-07-15', NULL),
  (13, 'Yuki Tanaka',    'yuki@example.com',    'Japan',         '2024-08-01', NULL),
  (14, 'Guest User',     'guest@example.com',   'India',         '2024-08-12', '');

INSERT INTO shop.products (id, name, category, price) VALUES
  (1,  'USB-C Hub',           'Accessories', 29.99),
  (2,  'Mechanical Keyboard', 'Accessories', 89.00),
  (3,  '14-inch Laptop',      'Computers',  999.00),
  (4,  'Wireless Mouse',      'Accessories', 24.50),
  (5,  '27-inch Monitor',     'Displays',   279.00),
  (6,  'Noise-cancelling Headphones', 'Audio', 149.00),
  (7,  'Standing Desk',       'Furniture',  420.00),
  (8,  'Desk Lamp',           'Furniture',   39.00),
  (9,  'External SSD 1TB',    'Storage',     99.00),
  (10, 'Webcam HD',           'Accessories', 59.00),
  (11, 'Laptop Sleeve',       'Accessories', 19.00),
  (12, 'Bluetooth Speaker',   'Audio',       45.00),
  (13, 'Gift Card',           'Other',       25.00);

INSERT INTO shop.orders (id, customer_id, product_id, quantity, ordered_at) VALUES
  (1,  1,  2, 1, '2024-07-01'),
  (2,  1,  4, 2, '2024-07-03'),
  (3,  2,  3, 1, '2024-07-05'),
  (4,  3,  6, 1, '2024-07-07'),
  (5,  4,  1, 1, '2024-07-08'),
  (6,  4,  9, 1, '2024-07-09'),
  (7,  5,  5, 1, '2024-07-10'),
  (8,  6,  8, 2, '2024-07-12'),
  (9,  7,  3, 1, '2024-07-14'),
  (10, 7, 11, 1, '2024-07-15'),
  (11, 8, 12, 1, '2024-07-16'),
  (12, 9, 10, 1, '2024-07-18'),
  (13, 10, 7, 1, '2024-07-20'),
  (14, 11, 2, 1, '2024-07-21'),
  (15, 12, 4, 1, '2024-07-22');
