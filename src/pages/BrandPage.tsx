import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/ProductType";
import { FaArrowLeft } from "react-icons/fa";
import { apiUrl } from "../services/api";

const BrandPage: React.FC = () => {
  const { brand } = useParams<{ brand: string }>(); // Get brand from URL
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      const brandProducts = data.products.filter(
        (product: Product) => product.brand === brand
      );
      setProducts(brandProducts);
    };

    fetchProducts();
  }, [brand]);

  return (
    <div className="py-6 px-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-lg font-semibold text-golden-yellow mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{brand} Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)} // Navigate to Product Details
            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform duration-200"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-700 text-sm">${product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
