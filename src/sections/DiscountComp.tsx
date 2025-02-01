import React from "react";
import { motion } from "framer-motion";
import { Product } from "../types/ProductType";

interface DiscountProps {
  products: Product[];
}

const DiscountComp: React.FC<DiscountProps> = ({ products }) => {
  // Sort products by discount percentage in descending order and take the top 5
  const sortedProducts = [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 5);

  return (
    <div className="py-6 bg-golden-yellow">
      <h2 className="text-2xl font-bold mb-4">Get Up To 70% Off</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="p-4 border rounded-lg shadow-md cursor-pointer bg-deep-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={product.images[0]} // Assuming the first image in the array is the main image
              alt={product.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold">
              Save {product.discountPercentage}%
            </p>
            <p className="text-gray-600">{product.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscountComp;
