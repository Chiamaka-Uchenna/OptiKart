import React from "react";
import { motion } from "framer-motion";
import { Product } from "../types/ProductType";

interface WeeklyPopularProps {
  products: Product[];
}

const WeeklyPopular: React.FC<WeeklyPopularProps> = ({ products }) => {
  // Sort products by rating in descending order and take the top 10
  const sortedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Weekly Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="p-4 border rounded-lg shadow-md cursor-pointer bg-golden-yellow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={product.images[0]} // Assuming the first image in the array is the main image
              alt={product.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-yellow-500">Rating: {product.rating}⭐</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPopular;
