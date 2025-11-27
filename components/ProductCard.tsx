import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../constants";
import type { Product } from "../types";

interface ProductCardProps {
  member: Product;
  index: string;
  activeIndex: string | null;
  setActiveIndex: (index: string | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  member,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const isExpanded = activeIndex === index;

  const toggleExpand = () => {
    setActiveIndex(isExpanded ? null : index);
  };

  return (
    // The parent div's height will now naturally adjust for expanded content
    // Removed fixed height constraints from the outer card itself
    <div
      className={`bg-${COLORS.bgWhite} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center p-4`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="rounded-full w-62 h-62 mb-4 object-cover border-4 border-white shadow-lg"
      />

      {/* Click name to navigate */}
      <Link
        to={`/category/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
        className={`text-lg font-semibold text-${COLORS.brandDark} mb-1 hover:underline hover:text-${COLORS.brandGreen} transition-colors duration-300`}
      >
        {member.name}
      </Link>
    </div>
  );
};

export default ProductCard;
