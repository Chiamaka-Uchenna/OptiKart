import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopularProductCard from "../components/PopularProductCard";
import { Product } from "../types/ProductType";
import { FaStar } from "react-icons/fa";
import { apiUrl } from "../services/api";

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Sort by rating in descending order and take the top 4
        const topRatedProducts = data.products
          .sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4);

        setProducts(topRatedProducts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (loading)
    return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-deep-blue"> Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value.
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            {/* Image Card */}
            <PopularProductCard product={product} />

            {/* Star, Title & Price (outside the card) */}
            <div className="mt-4 flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 w-6 h-6" />
                <p className="font-montserrat text-xl text-slate-gray">
                  {product.rating?.toFixed(1) || "4.5"}
                </p>
              </div>
              <h3 className="mt-2 text-2xl font-semibold font-palanquin">
                {product.title}
              </h3>
              <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
