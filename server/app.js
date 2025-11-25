import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { FRONTEND_URL } from "./config.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { authRouter } from "./routes/auth.js";
import { checkoutRouter, handleWebhook } from "./routes/checkout.js";
import { ordersRouter } from "./routes/orders.js";
import { cronRouter } from "./routes/cron.js";

export const app = express();

// cors
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(requestLogger);

// json parser except webhook
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// routes
app.use("/auth", authRouter);
app.use("/create-checkout-session", checkoutRouter);
app.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);
app.use("/orders", ordersRouter);
app.use("/cron", cronRouter);

app.get("/", (_req, res) => res.send("Backend running"));
