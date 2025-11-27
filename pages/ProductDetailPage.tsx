import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
const ProductDetailPage = () => {
  const { id } = useParams<{ id?: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) return <p className="p-10">Product not found.</p>;

  return (
    // <div className="grid md:grid-cols-2 gap-12 p-10">
    <div className="grid md:grid-cols-[70%_30%] gap-12 p-10">
      {/* Left side */}

      <div className="grid grid-rows-2 gap-4">
        {/* First row: one image */}
        <div>
          <img
            src={product.gallery[0]}
            alt={`${product.name}-1`}
            className="w-full h-[400px] object-contain rounded-lg shadow"
          />
        </div>

        {/* Second row: two images side by side */}
        <div className="grid grid-cols-2 gap-4">
          {product.gallery.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name}-${index + 2}`}
              className="w-full h-[300px] object-contain rounded-lg shadow"
            />
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="space-y-20 py-20">
        <h1 className="text-3xl font-serif leading-snug">{product.name}</h1>
        <p className="text-gray-600 text-[17px] leading-relaxed">
          {product.description}
        </p>
        <p className="text-xl font-semibold text-gray-800">{product.price}</p>
        <button
          onClick={() => {
            const token = localStorage.getItem("auth_token");
            if (!token) {
              toast.error("Please sign in first to add items to your cart.");
              window.location.href = "/#/user";
              return;
            }

            console.log("🛒 addToCart clicked:", product.name);
            addToCart(product); // ✅ Logged in, add normally
          }}
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-[#81D8D0] transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
