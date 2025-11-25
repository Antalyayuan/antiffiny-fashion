import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import SectionContainer from "../components/SectionContainer";
import { COLORS } from "../constants";
import { productsCategoryData } from "@/components/productsCategoryData";
import ProductCard from "../components/ProductCard";
import aboutImage from "../assets/images/aboutBg.jpg";

const product = productsCategoryData;

const ProductsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Shopping Now"
        imageSeed="leadership-team"
        image={aboutImage}
      />

      {/* Products Intro Section */}
      <SectionContainer className={`bg-${COLORS.bgLight}`}>
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-bold text-${COLORS.brandDark} mb-6 sm:mb-8 text-center`}
        >
          Shop by Category
        </h2>
        <div className="w-full overflow-x-auto py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
            {product.map((member, index) => (
              <ProductCard
                key={member.name}
                member={member}
                index={`board-${index}`}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default ProductsPage;
