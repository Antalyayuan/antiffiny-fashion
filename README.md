# 💎 Tiffany Fashion Website

A full-stack **fashion e-commerce demo** built with **React + TypeScript (Vite frontend)** and **Node.js + Express (backend)**.  
Includes **Stripe** integration for payment processing and a **MySQL** database for product and order management.

---

## 🚀 Run Locally

### **Prerequisites**

- Node.js (v18 or higher)
- npm
- Stripe CLI _(for local webhook testing)_
- MySQL database running locally or remotely

---

### **1️⃣ Clone and install dependencies**

```bash
git clone https://github.com/your-company/tiffany-fashion.git
cd Tiffany
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

---

### **2️⃣ Environment setup**

Create a file named `.env.local` in both the **project root** and the **server** folder (if needed).

Example `.env.local`:

```bash
# === Stripe keys ===
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# === Database config ===
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password_here
DB_NAME=tiffany_store
```

> Refer to `.env.example` for variable names and formats.

---

### **3️⃣ Run the backend**

```bash
cd server
node server.js
```

Expected output:

```
[dotenv@17.2.3] injecting env (8) from .env.local
✅ Server running on https://tiffany-fashion-production.up.railway.app/
```

---

### **4️⃣ Run the frontend**

Open another terminal window in the project root:

```bash
npm run dev
```

Expected output:

```
VITE v6.4.1  ready in 1848 ms
➜  Local:   https://tiffany-fashion-annie.vercel.app/
```

Then open **https://tiffany-fashion-annie.vercel.app/** in your browser 🎉

---

### **5️⃣ (Optional) Stripe Webhook listener**

If you’re testing Stripe locally, run:

```bash
stripe listen --forward-to localhost:4242/webhook
```

Expected output:

```
> Ready! You are using Stripe API Version [2025-10-29.clover]
> Your webhook signing secret is whsec_xxx
✅ charge.succeeded [evt_3SQlN0Injg5aIaQp19pIv0sv]
```

---

## 🧠 Notes

- Backend runs on **https://tiffany-fashion-production.up.railway.app/**
- Frontend runs on **https://tiffany-fashion-annie.vercel.app/**
- Keep `.env.local` private — it contains your keys and database credentials.
- Deploy the production build to your VPS (e.g. **https://fashion.davethan.tech**) once tested locally.

---

## 🧰 Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React, TypeScript, Vite, TailwindCSS |
| Backend    | Node.js, Express                     |
| Payment    | Stripe                               |
| Database   | MySQL                                |
| Deployment | VPS (Nginx, PM2)                     |

---

## ⚙️ Deployment Notes (VPS)

After pushing to your private GitHub repo, SSH into your VPS:

```bash
git clone https://github.com/your-company/tiffany-fashion.git
cd tiffany-fashion
npm install
cd server && npm install
npm run build
```

Then configure Nginx to serve from `dist/` (frontend) and proxy backend requests to port **4242**.
