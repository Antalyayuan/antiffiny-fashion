import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
dotenv.config({ path: envFile });

const required = [
  "PORT",
  "FRONTEND_URL",
  "BACKEND_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "JWT_SECRET",
  "SENDGRID_API_KEY",
  "EMAIL_FROM",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(`Missing env vars: ${missing.join(", ")}`);
}

export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_PROD = NODE_ENV === "production";

export const PORT = Number(process.env.PORT) || 4242;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const BACKEND_URL = process.env.BACKEND_URL;

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const JWT_SECRET = process.env.JWT_SECRET;
export const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const EMAIL_FROM = process.env.EMAIL_FROM;
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Antiffany Fashion Annie";

export const CRON_SECRET = process.env.CRON_SECRET;
