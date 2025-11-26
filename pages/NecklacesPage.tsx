import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../constants";

// 模拟数据（后面可以从数据库或API获取）
const products = [
  {
    id: 1,
    name: "Large Double Link Pendant in Yellow Gold",
    collection: "Antiffany HardWear",
    price: "£4,100",
    image: "/images/necklace1.jpg",
  },
  {
    id: 2,
    name: "Micro Link Necklace in Yellow Gold",
    collection: "Antiffany HardWear",
    price: "£7,250",
    image: "/images/necklace2.jpg",
  },
  {
    id: 3,
    name: "Smile Small Pendant in Yellow Gold with Diamonds",
    collection: "Antiffany T",
    price: "£1,725",
    image: "/images/necklace3.jpg",
  },
];

const NecklacesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen px-8 md:px-20 py-16">
      <h1 className="text-3xl font-serif text-center mb-12">
        Necklaces & Pendants
      </h1>

      {/* 商品卡片区域 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-contain mb-4 transition-transform duration-500 hover:scale-105"
            />
            <h3 className="text-lg font-medium">{product.collection}</h3>
            <p className={`text-${COLORS.textSecondary} text-sm`}>
              {product.name}
            </p>
            <p className="text-black mt-1">{product.price}</p>
            <Link
              to={`/product/${product.id}`}
              className="block mt-2 text-sm text-gray-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NecklacesPage;
