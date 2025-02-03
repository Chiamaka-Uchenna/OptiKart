import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/ProductType"; 
import { FaArrowLeft } from "react-icons/fa"; 
import { apiUrl } from "../services/api";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); 
  const navigate = useNavigate(); 
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products and filter by category
    const fetchProducts = async () => {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      const filteredProducts = data.products.filter(
        (product: Product) => product.category === category
      );
      setProducts(filteredProducts);
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="py-6 px-10">
      {/* Back button navigates to the previous page */}
      <button
        onClick={() => navigate(-1)}
        className="text-lg font-semibold text-golden-yellow flex items-center mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{category} Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)} // Navigate to product details
            className="bg-white rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-700 text-sm truncate">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
