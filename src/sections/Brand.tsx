// src/components/Brand.tsx
import React from "react";
import { motion } from "framer-motion";
import { Product } from "../types/ProductType";

interface BrandProps {
  products: Product[];
}

const Brand: React.FC<BrandProps> = ({ products }) => {
  // Get unique brands from the products list
  const uniqueBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );

  return (
    <div className="py-6 bg-deep-blue">
      <h2 className="text-2xl font-bold mb-4">Choose By Brand</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {uniqueBrands.map((brand, index) => {
          return (
            <motion.div
              key={index}
              className="flex items-center justify-center p-4 border rounded-lg shadow-md cursor-pointer bg-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-italic text-center text-gray-800">
                {brand}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Brand;
