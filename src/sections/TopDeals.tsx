import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "../types/ProductType";
import { useNavigate } from "react-router-dom";

interface TopDealsProps {
  products: Product[];
}

const TopDeals: React.FC<TopDealsProps> = ({ products }) => {
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]); // Store favorite product IDs
  const navigate = useNavigate();

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating when clicking the button
    setFavoriteItems((prevItems) =>
      prevItems.includes(product.id)
        ? prevItems.filter((id) => id !== product.id)
        : [...prevItems, product.id]
    );
  };

  const isFavorite = (product: Product) => favoriteItems.includes(product.id);

  // Sort products by `createdAt` in descending order and select the top 9
  const sortedProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.meta.createdAt).getTime() -
        new Date(a.meta.createdAt).getTime()
    )
    .slice(0, 9);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Top Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="border p-4 rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-700 font-bold mt-2">${product.price}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-golden-yellow text-white px-4 py-2 rounded hover:bg-yellow-500 transition duration-300">
                Add to Cart
              </button>
              <button
                onClick={(e) => handleToggleFavorite(product, e)}
                className="text-2xl"
              >
                {isFavorite(product) ? "💛" : "🤍"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
