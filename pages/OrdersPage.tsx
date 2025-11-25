import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  image?: string;
}

interface Order {
  id: number;
  order_id: string;
  amount: number;
  currency: string;
  customer_email: string;
  status: string;
  created_at: string;
  items: string;
  checkout_url?: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        alert("Please sign in to view your orders.");
        window.location.href = "/#/user";
        return;
      }

      try {
        const API = import.meta.env.VITE_API_BASE;
        const response = await fetch(`${API}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ 带上 JWT token
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert("Session expired. Please sign in again.");
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_firstname");
            localStorage.removeItem("user_email");
            window.location.href = "/#/user";
            return;
          }
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ 获取订单失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-500 animate-pulse">
        <div className="w-12 h-12 border-4 border-t-[#81D8D0] border-gray-200 rounded-full animate-spin mb-4"></div>
        <p>Loading your orders...</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="p-10 text-center text-gray-600">
        <p className="text-lg mb-6">No orders found yet.</p>
        <a
          href="/#/products"
          className="bg-[#81D8D0] text-white px-6 py-3 rounded hover:bg-[#66c7c0] transition"
        >
          Continue Shopping
        </a>
      </div>
    );

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif mb-10 text-center text-gray-800">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const items: OrderItem[] = (() => {
            try {
              return Array.isArray(order.items)
                ? order.items
                : JSON.parse(order.items);
            } catch {
              return [];
            }
          })();

          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              {/* 订单头部 */}
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <div>
                  <span className="text-sm font-mono text-gray-400 block">
                    {order.order_id.slice(0, 16)}...
                  </span>
                  <p className="text-gray-800 font-semibold mt-1">
                    £{Number(order.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order.currency} •{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              {/* 展开内容 */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t bg-gray-50"
                  >
                    {items.length > 0 ? (
                      <div className="divide-y">
                        {items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center py-4 space-x-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-gray-500 text-sm">
                                Qty: {item.quantity} × {item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic py-4">
                        No item details recorded.
                      </p>
                    )}

                    {/* 支付按钮 */}
                    <div className="flex justify-end mt-4">
                      {order.status === "unpaid" && order.checkout_url && (
                        <a
                          href={order.checkout_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-[#81D8D0] text-white px-5 py-2 rounded-lg hover:bg-[#5fc2b8] transition"
                        >
                          <CreditCard className="w-4 h-4" /> Pay Now
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
