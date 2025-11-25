CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'GBP',
  customer_email VARCHAR(255),
  user_email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'unpaid',
  items JSON,
  checkout_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_sent TINYINT(1) NOT NULL DEFAULT 0,
  INDEX(order_id)
);
