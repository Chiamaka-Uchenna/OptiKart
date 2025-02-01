import { useState, useEffect, useRef } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FiGrid } from "react-icons/fi";
import FilterComponent from "./FilterComponent";
import { useLocation } from "react-router-dom";

const CatalogHeader = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popular First");
  const filterRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Extract page name from route (for breadcrumbs)
  const getPageName = () => {
    const path = location.pathname.split("/").filter(Boolean);
    return path.length > 0 ? path[path.length - 1] : "Catalog";
  };

  const breadcrumbs = ["Home", getPageName()];

  // Function to handle filter updates
  const handleFilter = (filters: {
    categories: string[];
    brands: string[];
    priceRange: number[];
    inStock: boolean;
  }) => {
    console.log("Applied Filters:", filters);
    // You can update state or perform filtering logic here
  };

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-gray-200">
      {/* Left Side: Breadcrumbs & Catalog */}
      <div className="flex items-center space-x-4">
        {/* Breadcrumbs */}
        <nav className="text-gray-500 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && " / "}
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-black font-medium"
                    : "hover:underline cursor-pointer"
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>

        {/* Catalog Title & Filter Icon */}
        <div className="flex items-center space-x-2 relative">
          <h1 className="text-2xl font-bold">Catalog</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-deep-blue text-lg"
          >
            <IoFilterSharp />
          </button>
          {isFilterOpen && (
            <div
              ref={filterRef}
              className="absolute left-0 top-10 rounded-md w-64 z-50"
            >
              <FilterComponent onFilter={handleFilter} />
            </div>
          )}
        </div>
      </div>

      {/* Right Side: View Mode & Sorting */}
      <div className="flex items-center space-x-4">
        <FiGrid className="text-gray-600 text-xl cursor-pointer" />
        <select
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="Popular First">Popular First</option>
          <option value="What's New">What's New</option>
          <option value="Top Deals">Top Deals</option>
        </select>
      </div>
    </div>
  );
};
export default CatalogHeader;