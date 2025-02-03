import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../types/ProductType";
import { apiUrl } from "../services/api"; // Import the apiUrl from api.ts

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate between pages
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the query parameter "q" from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q")?.toLowerCase() || "";
  console.log("Search query:", query);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the apiUrl to fetch products
        const response = await fetch(`${apiUrl}`); // Assuming API has /products endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched products:", data.products);
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Memoize filtered products based on the search query
  const filteredProducts = useMemo(() => {
    if (!query) return products;

    return products.filter((product) => {
      const lowerTitle = product.title?.toLowerCase() || "";
      const lowerBrand = product.brand?.toLowerCase() || "";
      const lowerCategory = product.category?.toLowerCase() || "";

      const match =
        lowerTitle.includes(query) ||
        lowerBrand.includes(query) ||
        lowerCategory.includes(query);

      if (match) {
        console.log("Match found:", product);
      }
      return match;
    });
  }, [products, query]);

  // Handle loading state
  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Render filtered products
  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="text-lg font-bold mb-4 flex items-center space-x-2 hover:text-golden-yellow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-golden-yellow">Back</span>
      </button>

      <h1 className="text-2xl font-bold mb-4">
        Search Results for &quot;{query}&quot;
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-coral-red font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products match your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
