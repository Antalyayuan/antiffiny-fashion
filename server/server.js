import { FRONTEND_URL } from "./config.js";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendEmail } from "./sendEmail.js";
import { welcomeEmailTemplate } from "./welcomeEmail.js";
import { orderSuccessEmailTemplate } from "./orderSuccessEmail.js";
import { abandonedEmailTemplate } from "./abandonedEmail.js";

const app = express();

// ⭐ Stripe 初始化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// ⭐ CORS 放最前面
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ⭐ 日志输出
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// ⭐ bodyParser - 但排除 Webhook
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// ⭐ MySQL 连接池
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ⭐ 自动创建 orders 表（含 email_sent）
db.query(`
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
  )
`);

// db.query(`
//   CREATE TABLE users  (
//   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   first_name varchar(100) ,
//   last_name varchar(100) ,
//   email varchar(255) ,
//   password_hash varchar(255) ,
//   created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//   UNIQUE INDEX email(email ASC) USING BTREE
// ) 
// `);


// ------------------------
// 用户注册
// ------------------------
app.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query("SELECT id FROM users WHERE email = ?", [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hash],
      (err2, result) => {
        if (err2) return res.status(500).json({ error: "DB insert error" });

        // 发送欢迎邮件
        sendEmail({
          to: email,
          subject: "🎉 Welcome to Tiffany Fashion Annie",
          html: welcomeEmailTemplate(firstName),
        });

        res.json({ ok: true, userId: result.insertId });
      }
    );
  });
});

// ------------------------
// 登录
// ------------------------
app.post("/auth/signin", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({
      ok: true,
      token,
      profile: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  });
});

// ------------------------
// Token 验证中间件
// ------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET || "dev_secret", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// ------------------------
// 创建 Stripe Checkout Session
// ------------------------
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: item.description,
          images: [`${FRONTEND_URL}${item.image}`],
        },
        unit_amount: parseFloat(item.price.replace(/[£,]/g, "")) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${FRONTEND_URL}/#/success`,
      cancel_url: `${FRONTEND_URL}/#/cart`,
      locale: "en",
    });

    // 从 token 获取登录用户邮箱
    let userEmail = "guest_user";
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
        userEmail = decoded.email;
      } catch {
        console.warn("⚠️ Invalid token during checkout");
      }
    }

    const amount =
      line_items.reduce(
        (sum, item) => sum + item.price_data.unit_amount * item.quantity,
        0
      ) / 100;

    db.query(
      `INSERT INTO orders 
      (order_id, amount, currency, customer_email, user_email, status, items, checkout_url, email_sent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        session.id,
        amount,
        "GBP",
        "pending_customer",
        userEmail,
        "unpaid",
        JSON.stringify(cart),
        session.url,
      ],
      (err) => {
        if (err) {
          console.error("❌ MySQL insert error:", err);
          return res.status(500).json({ error: "Database insert failed" });
        }

        console.log(`📝 Created unpaid order: ${session.id} for ${userEmail}`);
        res.json({ url: session.url });
      }
    );
  } catch (err) {
    console.error("🔥 Checkout session error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Stripe Webhook
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("❌ Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Stripe 付款人邮箱（不再使用作为收件人）
      const paymentEmail =
        session.customer_details?.email || "unknown@example.com";

      // 1️⃣ 查询订单
      db.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [session.id],
        (err, results) => {
          if (err) {
            console.error("❌ Failed to load order", err);
            return;
          }

          if (results.length === 0) {
            console.error("❌ Order not found for webhook:", session.id);
            return;
          }

          const order = results[0];

          // 🚀 正确的收件人：当前登录用户（不是 Stripe 付款邮箱）
          const websiteUserEmail = order.user_email;

          let items = [];
          try {
            if (Array.isArray(order.items)) {
              // MySQL JSON 字段通过 mysql2 返回的情况：已经是数组
              items = order.items;
            } else if (typeof order.items === "string" && order.items.trim()) {
              // 老数据 / 某些环境下返回字符串，再做一次 JSON.parse
              items = JSON.parse(order.items);
            } else {
              items = [];
            }
          } catch (e) {
            console.error("❌ items JSON parse error, raw value:", order.items);
            items = [];
          }

          // 3️⃣ ⭐ 在这里修复图片路径 ⭐
          const IMAGE_BASE = process.env.FRONTEND_URL; // 来自 .env.local

          items = items.map((item) => ({
            ...item,
            image: item.image.startsWith("http")
              ? item.image
              : `${IMAGE_BASE}${item.image}`,
          }));

          // 3️⃣ 更新订单状态
          db.query(
            `UPDATE orders SET status = 'paid', customer_email = ? WHERE order_id = ?`,
            [paymentEmail, session.id]
          );

          // 4️⃣ 发送邮件给网站用户，而不是付款人！
          sendEmail({
            to: websiteUserEmail,
            subject: "🧾 Your Tiffany Fashion Annie Order Confirmation",
            html: orderSuccessEmailTemplate(order, items),
          });

          console.log(`💰 Order ${session.id} fully processed`);
          console.log(`📧 Email sent to website user: ${websiteUserEmail}`);
        }
      );
    }

    res.sendStatus(200);
  }
);

// ✅ 获取当前登录用户订单
app.get("/orders", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  db.query(
    "SELECT * FROM orders WHERE user_email = ? ORDER BY created_at DESC LIMIT 100",
    [userEmail],
    (err, results) => {
      if (err) {
        console.error("❌ MySQL 查询错误:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      res.json(results);
    }
  );
});

// 获取当前用户订单
// ------------------------
app.get("/orders", authenticateToken, (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE user_email = ? ORDER BY created_at DESC LIMIT 100",
    [req.user.email],
    (err, results) => {
      if (err) {
        console.error("❌ MySQL 查询错误:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results);
    }
  );
});

// ------------------------
// Home
// ------------------------
app.get("/", (req, res) => {
  res.send("✅ Tiffany Store backend is running!");
});

// ------------------------
// Abandoned orders（30分钟未付款自动发送提醒）
// ------------------------
app.get("/cron/abandoned-orders", (req, res) => {
  console.log("⏰ Running cron /cron/abandoned-orders");

  db.query(
    `
      SELECT * FROM orders
      WHERE status='unpaid'
      AND email_sent = 0
      AND created_at < NOW() - INTERVAL 3 MINUTE
    `,
    (err, results) => {
      if (err) {
        console.error("❌ CRON DB error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      console.log(`🔍 Found ${results.length} abandoned orders`);

      if (!results.length) {
        return res.json({ count: 0 });
      }

      results.forEach((order) => {
        console.log(
          `📧 Sending abandoned cart email for order_id=${order.order_id} to: ${order.user_email}`
        );

        let items = [];
        try {
          items = JSON.parse(order.items);
        } catch (e) {
          console.error("❌ Abandoned items JSON parse error:", order.items);
        }

        sendEmail({
          to: order.user_email,
          subject: "⏰ Complete your order at Tiffany Fashion Annie",
          html: abandonedEmailTemplate(order.checkout_url, items),
        });

        db.query(
          `UPDATE orders SET email_sent = 1 WHERE id = ?`,
          [order.id],
          (err2) => {
            if (err2) {
              console.error("❌ Failed to update email_sent flag:", err2);
            } else {
              console.log(`✅ Marked email_sent=1 for order id=${order.id}`);
            }
          }
        );
      });

      res.json({ count: results.length });
    }
  );
});



// 🧹 自动删除超过 24 小时的未支付订单
app.get("/cron/cleanup-unpaid", (req, res) => {
  db.query(
    `DELETE FROM orders 
     WHERE status = 'unpaid'
     AND created_at < NOW() - INTERVAL 24 HOUR`,
    (err, result) => {
      if (err) {
        console.error("❌ Cleanup error:", err);
        return res.status(500).json({ error: "Cleanup failed" });
      }

      console.log(`🧹 Cleaned ${result.affectedRows} unpaid orders`);
      res.json({ deleted: result.affectedRows });
    }
  );
});


import fetch from "node-fetch"; // 如果已经有则不用重复导入

// ⭐ 统一触发所有 cron 任务
app.get("/cron/run-all", async (req, res) => {
  try {
    console.log("⏰ Running ALL CRON TASKS");

    const base = process.env.BACKEND_URL;

    // 1️⃣ abandoned notice
    const abandonedRes = await fetch(`${base}/cron/abandoned-orders`);
    const abandonedJson = await abandonedRes.json();

    // 2️⃣ cleanup unpaid
    const cleanupRes = await fetch(`${base}/cron/cleanup-unpaid`);
    const cleanupJson = await cleanupRes.json();

    console.log("🎉 All cron tasks completed");

    res.json({
      ok: true,
      abandoned: abandonedJson,
      cleanup: cleanupJson,
    });
  } catch (err) {
    console.error("❌ CRON run-all error:", err);
    res.status(500).json({ error: "Cron failed", details: err.message });
  }
});



// ------------------------
// 启动服务器
// ------------------------
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => { 
  console.log(`✅ Server running on port ${PORT}`); 
  console.log(`🌱 NODE_ENV: ${process.env.NODE_ENV}`); 
  console.log(`🌐 FRONTEND_URL: ${FRONTEND_URL}`); 
  console.log("🌐 Webhook listening on /webhook"); 
  console.log("🧾 Orders API available at /orders"); 
});