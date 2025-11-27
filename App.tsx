import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import SuccessPage from "./pages/SuccessPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import UserPage from "./pages/UserPage";
import NecklacesPage from "./pages/NecklacesPage";
import CategoryPage from "./pages/CategoryPage";
import { NAV_ITEMS } from "./constants";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./pages/OrdersPage";
import CartPage from "./pages/CartPage";
import { Navigate } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Simple login protection component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("auth_token");
  return token ? children : <Navigate to="/user" replace />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen font-sans text-slate-700">
    <Navbar navItems={NAV_ITEMS} />
    <main className="flex-grow pt-16 md:pt-20">
      {" "}
      {/* Adjust pt based on Navbar height */}
      {children}
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/necklaces" element={<NecklacesPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/user" element={<UserPage />} />

            {/* Redirect to /user when accessing /orders without login */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
