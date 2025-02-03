
import { motion } from "framer-motion";
import { Product } from "../types/ProductType"; // Importing the Product type
import { Link } from "react-router-dom"; // Importing Link for routing


interface CategoryProps {
  products: Product[]; // Using the Product type from ProductType.ts
}

const Category: React.FC<CategoryProps> = ({ products }) => {
  // Get unique categories by filtering the products
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Shop Our Top Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {uniqueCategories.map((category, index) => {
          // Find the first product that matches the category
          const product = products.find((p) => p.category === category);
          if (product) {
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden bg-golden-yellow rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/category/${category}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Category;
