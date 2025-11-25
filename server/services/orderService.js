import { pool } from "../db/pool.js";

export async function createOrder({ orderId, amount, currency, customerEmail, userEmail, status, items, checkoutUrl }) {
  await pool.execute(
    `INSERT INTO orders (order_id, amount, currency, customer_email, user_email, status, items, checkout_url, email_sent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [orderId, amount, currency, customerEmail, userEmail, status, JSON.stringify(items), checkoutUrl]
  );
}

export async function markOrderPaid(orderId, paymentEmail) {
  await pool.execute(
    `UPDATE orders SET status = 'paid', customer_email = ? WHERE order_id = ?`,
    [paymentEmail, orderId]
  );
}

export async function listOrdersByUser(userEmail) {
  const [rows] = await pool.execute(
    "SELECT * FROM orders WHERE user_email = ? ORDER BY created_at DESC LIMIT 100",
    [userEmail]
  );
  return rows;
}

export async function findOrderById(orderId) {
  const [rows] = await pool.execute("SELECT * FROM orders WHERE order_id = ?", [orderId]);
  return rows[0] || null;
}

export async function markAbandonedEmailSent(id) {
  await pool.execute("UPDATE orders SET email_sent = 1 WHERE id = ?", [id]);
}

export async function cleanupUnpaidOlderThan(hours) {
  const [result] = await pool.execute(
    `DELETE FROM orders WHERE status = 'unpaid' AND created_at < NOW() - INTERVAL ? HOUR`,
    [hours]
  );
  return result.affectedRows;
}
