import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();

  // Filter products by category
  const filteredProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-serif mb-8 py-10">
        {categoryName
          ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
          : ""}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[350px] object-contain mb-4 transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <p className="text-black font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
