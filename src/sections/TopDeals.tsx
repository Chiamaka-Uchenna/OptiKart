import { motion } from "framer-motion";
import { Product } from "../types/ProductType";

interface TopDealsProps {
  products: Product[];
}

const TopDeals: React.FC<TopDealsProps> = ({ products }) => {
  // Sort products by the `createdAt` date in descending order and select the top 10
  const sortedProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.meta.createdAt).getTime() -
        new Date(a.meta.createdAt).getTime()
    )
    .slice(0, 10); // Select only the top 10

  return (
    <div className="bg-deep-blue grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sortedProducts.map((product) => (
        <motion.div
          key={product.id}
          className="border p-4 rounded-lg shadow-lg bg-white"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-blue-500 font-bold mt-2">${product.price}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TopDeals;
