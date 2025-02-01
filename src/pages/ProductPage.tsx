import { useState, useEffect } from "react";
import CatalogHeader from "../components/CatalogHeader";
import TopDeals from "../sections/TopDeals";
import Category from "../sections/Category";
import Brand from "../sections/Brand";
import DiscountComp from "../sections/DiscountComp";
import WeeklyPopular from "../sections/WeeklyPopular";
import { Product } from "../types/ProductType";



const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="pt-2 p-8">
      <CatalogHeader />
      <TopDeals products={products} />
      <Category products={products} />
      <Brand products={products} />
      <DiscountComp products={products} />
      <WeeklyPopular products={products} />
    </div>
  );
};

export default ProductPage;
