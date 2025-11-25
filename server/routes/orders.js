import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import { listOrdersByUser } from "../services/orderService.js";

export const ordersRouter = express.Router();

ordersRouter.get("/", authenticateToken, async (req, res) => {
  const orders = await listOrdersByUser(req.user.email);
  res.json(orders);
});
