
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BrandProps {
  products: { brand?: string }[]; // Ensure brand is optional to avoid undefined errors
}

const Brand: React.FC<BrandProps> = ({ products }) => {
  const navigate = useNavigate();

  // Get unique brands, ensuring empty, null, or undefined brands are removed
  const uniqueBrands = Array.from(
    new Set(
      products
        .map((product) => product.brand?.trim()) // Trim spaces and check for undefined
        .filter((brand) => brand && brand.length > 0) // Remove falsy values (empty, null, undefined)
    )
  );

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Choose By Brand</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {uniqueBrands.length > 0 ? (
          uniqueBrands.map((brand, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(`/brand/${brand}`)} 
              className="flex items-center justify-center p-4 border-4 border-golden-yellow rounded-lg shadow-md cursor-pointer bg-deep-blue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-extrabold text-center text-golden-yellow">
                {brand}
              </span>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No brands available.</p>
        )}
      </div>
    </div>
  );
};

export default Brand;
