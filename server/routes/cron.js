import express from "express";
import fetch from "node-fetch";
import { CRON_SECRET, BACKEND_URL } from "../config.js";
import { cleanupUnpaidOlderThan, markAbandonedEmailSent } from "../services/orderService.js";
import { sendEmail } from "../services/emailService.js";
import { abandonedEmailTemplate } from "../templates/abandonedEmail.js";
import { pool } from "../db/pool.js";

export const cronRouter = express.Router();

function assertCronSecret(req, res, next) {
  if (!CRON_SECRET) return res.status(500).json({ error: "CRON_SECRET not set" });
  if (req.headers["x-cron-secret"] !== CRON_SECRET) return res.status(401).json({ error: "Unauthorized" });
  next();
}

cronRouter.use(assertCronSecret);

cronRouter.get("/abandoned-orders", async (_req, res) => {
  const [rows] = await pool.execute(
    `SELECT * FROM orders WHERE status='unpaid' AND email_sent = 0 AND created_at < NOW() - INTERVAL 30 MINUTE`
  );

  await Promise.all(
    rows.map(async (order) => {
      let items = [];
      try {
        items = JSON.parse(order.items);
      } catch {}
      await sendEmail({
        to: order.user_email,
        subject: "Complete your order at Tiffany Fashion Annie",
        html: abandonedEmailTemplate(order.checkout_url, items),
      });
      await markAbandonedEmailSent(order.id);
    })
  );

  res.json({ count: rows.length });
});

cronRouter.get("/cleanup-unpaid", async (_req, res) => {
  const deleted = await cleanupUnpaidOlderThan(24);
  res.json({ deleted });
});

cronRouter.get("/run-all", async (_req, res) => {
  const abandoned = await fetch(`${BACKEND_URL}/cron/abandoned-orders`, {
    headers: { "x-cron-secret": CRON_SECRET },
  }).then((r) => r.json());

  const cleanup = await fetch(`${BACKEND_URL}/cron/cleanup-unpaid`, {
    headers: { "x-cron-secret": CRON_SECRET },
  }).then((r) => r.json());

  res.json({ ok: true, abandoned, cleanup });
});
