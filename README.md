# 💎 Antiffany Fashion

A modern, full-stack luxury jewelry e-commerce platform built with React, TypeScript, and Node.js. Features secure payment processing with Stripe, user authentication, automated email notifications, and real-time order management.

## ✨ Features

### Customer Features
- 🛍️ **Product Catalog** - Browse jewelry collections by category (Necklaces, Rings, Earrings, Bracelets)
- 🔍 **Product Details** - High-quality image galleries with detailed descriptions
- 🛒 **Shopping Cart** - Add items, manage quantities, and proceed to checkout
- 💳 **Secure Checkout** - Stripe integration for safe payment processing
- 👤 **User Authentication** - Sign up/Sign in with JWT-based authentication
- 📦 **Order Tracking** - View order history and payment status
- 📧 **Email Notifications** - Automated emails for welcome, order confirmation, and abandoned carts

### Admin Features
- 📊 **Order Management** - Track all orders with status updates
- 🔄 **Automated Workflows** - Scheduled tasks for abandoned cart recovery and database cleanup
- 📨 **Email Automation** - SendGrid integration for transactional emails

## �️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS (utility-first)
- **Animations**: Framer Motion
- **UI Components**: Lucide React icons, Swiper carousel
- **State Management**: React Context API
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js with Express 5
- **Database**: MySQL 2
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Payment**: Stripe API
- **Email**: SendGrid
- **Security**: CORS, body-parser

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Stripe account
- SendGrid account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/davethantech/antiffiny-fashion.git
cd antiffiny-fashion
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the `server` directory:

```env
# Server Configuration
PORT=4242
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4242

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=antiffany_db

# JWT Secret
JWT_SECRET=your_jwt_secret_key
BCRYPT_ROUNDS=10

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Antiffany Fashion Annie

# Cron Secret (for scheduled tasks)
CRON_SECRET=your_cron_secret_key
```

Create a `.env.development` file in the root directory:

```env
VITE_API_BASE=http://localhost:4242
NODE_ENV=development
```

4. **Set up the database**

Create a MySQL database and run the necessary migrations to set up tables for users, orders, and products.

5. **Start the development servers**

**Backend:**
```bash
node server/server.js
```

**Frontend (in a new terminal):**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
antiffiny-fashion/
├── components/          # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── CartPage.tsx
│   ├── UserPage.tsx
│   └── ...
├── context/            # React Context providers
│   └── CartContext.tsx
├── data/               # Static data and types
│   └── products.ts
├── server/             # Backend application
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── templates/      # Email templates
│   ├── middlewares/    # Express middlewares
│   ├── db/            # Database configuration
│   └── server.js      # Entry point
├── assets/            # Images and static files
└── public/            # Public assets
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `node server/server.js` - Start backend server

## 🔐 Authentication Flow

1. User signs up with email and password
2. Password is hashed using bcrypt
3. User receives a welcome email via SendGrid
4. On sign in, JWT token is generated and stored in localStorage
5. Protected routes verify JWT token before granting access

## 💳 Payment Flow

1. User adds items to cart
2. Proceeds to checkout (requires authentication)
3. Stripe checkout session is created
4. User completes payment on Stripe's secure page
5. Webhook confirms payment and updates order status
6. Order confirmation email is sent automatically

## 📧 Automated Email System

The application includes three types of automated emails:

1. **Welcome Email** - Sent immediately upon user registration
2. **Order Confirmation** - Sent when payment is successfully processed
3. **Abandoned Cart** - Sent to users who started checkout but didn't complete payment (after 3 minutes)

### Email Scheduler

The backend includes an automated scheduler that runs every 5 minutes to:
- Check for abandoned carts and send reminder emails
- Clean up unpaid orders older than 24 hours

## 🧪 Testing

### Test Abandoned Cart Email
A verification script is included for testing:
```bash
cd server
node verify_abandoned.js
```

### Stripe Webhook Testing
Use Stripe CLI to test webhooks locally:
```bash
stripe listen --forward-to localhost:4242/webhook
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables in your hosting dashboard

### Backend (Railway/Heroku/VPS)
1. Push code to your hosting platform
2. Set all environment variables
3. Ensure MySQL database is accessible
4. Start the server with `node server/server.js`

### Database
- Set up MySQL database on your hosting platform
- Update connection credentials in `.env.local`
- Run database migrations

## 🔒 Security Notes

- Never commit `.env.local` or `.env.production` files
- Keep your Stripe secret keys secure
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Regularly update dependencies

## 📝 License

This project is private and proprietary.

## 👥 Contact

For questions or support, contact: annie.wang@davethan.tech

---

**Built with ❤️ by DaveThan Tech**
