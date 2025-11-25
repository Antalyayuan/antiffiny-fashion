import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/[£,]/g, "")) * item.quantity,
    0
  );

  // ✅ 处理 Checkout 按钮点击
  const handleCheckout = async () => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_firstname");

    // 🚫 未登录则跳转登录页
    if (!token) {
      alert("Please sign in to proceed to checkout.");
      window.location.href = "/#/user";
      return;
    }

    try {
      console.log("🛒 Step 1 - Starting checkout");
      console.log("🛒 Step 2 - Cart content:", cart);

      const API = import.meta.env.VITE_API_BASE;

      // ✅ 调用后端接口，携带 token
      const response = await fetch(`${API}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ 传入登录 token
        },
        body: JSON.stringify({ cart }),
      });

      console.log("📦 Step 3 - Got response:", response);

      if (!response.ok) {
        const errData = await response.json();
        console.error("❌ Server error:", errData);
        throw new Error(errData.error || "Checkout session creation failed");
      }

      const data = await response.json();
      console.log("💳 Step 4 - Response JSON:", data);

      if (!data.url) {
        alert("❌ Checkout failed: no URL returned");
        return;
      }

      console.log("🚀 Step 5 - Redirecting to Stripe:", data.url);
      window.location.href = data.url; // ✅ 跳转 Stripe 页面
    } catch (error) {
      console.error("🔥 Step 6 - Checkout error:", error);
      alert("❌ Checkout failed, please try again.");
    }
  };

  // ✅ 空购物车提示
  if (cart.length === 0)
    return (
      <div className="p-10 text-center text-gray-600">
        <p className="text-lg mb-6">Your cart is empty.</p>
        <Link
          to="/products"
          className="bg-[#81D8D0] text-white px-6 py-3 rounded hover:bg-[#5fc2b8] transition"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif mb-8 text-center">Shopping Cart</h1>

      {/* ✅ 商品列表 */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">{item.price}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* ✅ 总价区域 */}
      <div className="flex justify-between mt-8 text-lg font-semibold border-t pt-6">
        <p>Total:</p>
        <p>£{total.toLocaleString()}</p>
      </div>

      {/* ✅ 操作按钮区域 */}
      <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
        {/* 返回继续购物 */}
        <Link
          to="/products"
          className="border border-gray-400 text-gray-700 px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          ← Continue Shopping
        </Link>

        {/* 清空购物车 */}
        <button
          onClick={clearCart}
          className="text-red-500 border border-red-400 px-6 py-3 rounded hover:bg-red-100 transition"
        >
          Clear Cart
        </button>

        {/* 前往结账 */}
        <button
          onClick={handleCheckout}
          className="bg-black text-white px-8 py-3 rounded hover:bg-[#81D8D0] transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
