import express from "express";
import jwt from "jsonwebtoken";
import { stripe } from "../services/stripeService.js";
import { FRONTEND_URL, JWT_SECRET, STRIPE_WEBHOOK_SECRET } from "../config.js";
import { createOrder, findOrderById, markOrderPaid } from "../services/orderService.js";

export const checkoutRouter = express.Router();

// POST /create-checkout-session (mounted at this path in app.js)
checkoutRouter.post("/", async (req, res) => {
  const { cart } = req.body || {};
  if (!cart || !cart.length) return res.status(400).json({ error: "Cart is empty" });

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

  let userEmail = "guest_user";
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      userEmail = decoded.email;
    } catch {
      console.warn("Invalid token during checkout");
    }
  }

  const amount =
    line_items.reduce((sum, item) => sum + item.price_data.unit_amount * item.quantity, 0) / 100;

  await createOrder({
    orderId: session.id,
    amount,
    currency: "GBP",
    customerEmail: "pending_customer",
    userEmail,
    status: "unpaid",
    items: cart,
    checkoutUrl: session.url,
  });

  res.json({ url: session.url });
});

// webhook raw body will be set in app.js, not here
export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const paymentEmail = session.customer_details?.email || "unknown@example.com";
    const order = await findOrderById(session.id);
    if (!order) return res.status(200).end();

    let items = [];
    try {
      items = Array.isArray(order.items) ? order.items : JSON.parse(order.items);
    } catch {
      items = [];
    }

    const imageBase = FRONTEND_URL;
    items = items.map((item) => ({
      ...item,
      image: item.image.startsWith("http") ? item.image : `${imageBase}${item.image}`,
    }));

    await markOrderPaid(session.id, paymentEmail);

    // send confirmation email via orderService/emailService if desired
    // left here to reuse existing sendEmail/orderSuccessEmailTemplate
  }

  res.sendStatus(200);
};
