
import { motion } from "framer-motion";
import { Product } from "../types/ProductType";
import { useNavigate } from "react-router-dom";

interface DiscountProps {
  products: Product[];
}

const DiscountComp: React.FC<DiscountProps> = ({ products }) => {
  const navigate = useNavigate();

  // Sort products by discount percentage in descending order and take the top 5
  const sortedProducts = [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 5);

  return (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-left">
        Get Up To 70% Off
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Top Section - Discount & Text */}
            <div className="bg-deep-blue p-4">
              <p className="text-golden-yellow font-medium">Save</p>
              <p className="text-3xl font-bold text-golden-yellow">
                $
                {Math.round((product.price * product.discountPercentage) / 100)}
              </p>
              <p className="text-golden-yellow mt-2">
                {product.title.length > 40
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </p>
            </div>

            {/* Bottom Section - Product Image */}
            <img
              src={product.images[0]} // Assuming first image is primary
              alt={product.title}
              className="w-full h-40 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscountComp;
