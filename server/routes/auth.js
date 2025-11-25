import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";
import { JWT_SECRET, BCRYPT_ROUNDS } from "../config.js";
import { sendEmail } from "../services/emailService.js";
import { welcomeEmailTemplate } from "../templates/welcomeEmail.js";

export const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const [rows] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
  if (rows.length) return res.status(409).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const [result] = await pool.execute(
    "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, hash]
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Tiffany Fashion Annie",
    html: welcomeEmailTemplate(firstName),
  });

  res.json({ ok: true, userId: result.insertId });
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
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
