import dotenv from "dotenv";

// 本地开发优先加载 .env.local
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
} else {
  // Railway 等线上自动从环境变量加载
  dotenv.config();
}


export const IS_PROD = process.env.NODE_ENV === "production";

// 基础配置
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4242";


// Stripe / DB / JWT 配置仍保留在 .env.local
export const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
