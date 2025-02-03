import { useState, useEffect } from "react";
import CatalogHeader from "../components/CatalogHeader";
import TopDeals from "../sections/TopDeals";
import Category from "../sections/Category";
import Brand from "../sections/Brand";
import DiscountComp from "../sections/DiscountComp";
import WeeklyPopular from "../sections/WeeklyPopular";
import { Product } from "../types/ProductType";
import { apiUrl } from "../services/api";
interface Filters {
  categories: string[];
  brands: string[];
  priceRange: number[];
  inStock: boolean;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // This state holds the filtered products (if filters are active)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // This state tracks whether filters are active
  const [filteringActive, setFilteringActive] = useState<boolean>(false);

  // Default filter values (adjust as needed)
  const defaultFilters: Filters = {
    categories: [],
    brands: [],
    priceRange: [5, 5000],
    inStock: false,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Initially, all products
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // This function is called when filters are applied (or reset) via CatalogHeader's dropdown
  const handleFilter = (filters: Filters) => {
    let tempProducts = [...products];

    // Filter by selected categories if any are chosen
    if (filters.categories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by selected brands if any are chosen
    if (filters.brands.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Filter by price range
    tempProducts = tempProducts.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filter by in-stock only (if toggled on)
    if (filters.inStock) {
      tempProducts = tempProducts.filter((product) => product.stock > 0);
    }

    setFilteredProducts(tempProducts);

    // Determine if filters are still at their default values
    const isDefaultFilter =
      filters.categories.length === defaultFilters.categories.length &&
      filters.brands.length === defaultFilters.brands.length &&
      filters.inStock === defaultFilters.inStock &&
      filters.priceRange[0] === defaultFilters.priceRange[0] &&
      filters.priceRange[1] === defaultFilters.priceRange[1];

    // If the filters are not default, filtering is active
    setFilteringActive(!isDefaultFilter);
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="pt-2 p-6">
      {/* CatalogHeader (which includes the filter dropdown) */}
      <CatalogHeader onFilter={handleFilter} />

      {filteringActive ? (
        // When filters are active, show only the filtered products grid
        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <p className="text-center">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  {product.thumbnail && (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  )}
                  <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="font-semibold">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // When no filters are active, show the regular sections
        <div className="mt-10">
          <TopDeals products={products} />
          <Category products={products} />
          <Brand products={products} />
          <DiscountComp products={products} />
          <WeeklyPopular products={products} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
