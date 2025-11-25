import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="p-20 text-center">
      {/* ✅ 动画效果 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mb-6"
      >
        <div className="bg-green-100 text-green-600 rounded-full p-6">
          <span className="text-5xl">✅</span>
        </div>
      </motion.div>

      <h1 className="text-4xl font-serif mb-4 text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 mb-10">
        Thank you for your purchase! Your order is being processed.
      </p>
      <Link
        to="/"
        className="text-[#81D8D0] hover:underline font-medium tracking-wide"
      >
        Continue Shopping →
      </Link>
    </div>
  );
};

export default SuccessPage;
