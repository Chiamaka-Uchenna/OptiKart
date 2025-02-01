import React, { useState, useEffect } from "react";
import axios from "axios";
import { Slider, Checkbox, Switch, Button } from "@mui/material";

interface Product {
  category: string;
  brand: string;
}

interface FilterProps {
  onFilter: (filters: {
    categories: string[];
    brands: string[];
    priceRange: number[];
    inStock: boolean;
  }) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onFilter }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([5, 1000]);
  const [inStock, setInStock] = useState<boolean>(false);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      const products: Product[] = response.data.products;
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      const uniqueBrands = [...new Set(products.map((p) => p.brand))];
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
    });
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const applyFilters = () => {
    onFilter({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      inStock,
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([5, 1000]);
    setInStock(false);
    onFilter({
      categories: [],
      brands: [],
      priceRange: [5, 1000],
      inStock: false,
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full md:w-80">
      <h2 className="text-lg font-bold">Filters</h2>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mt-4">Category</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <Checkbox
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold mt-4">Price Range</h3>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={5}
          max={1000}
        />
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold mt-4">Brand</h3>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center">
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            <span>{brand}</span>
          </div>
        ))}
      </div>

      {/* In Stock Filter */}
      <div className="flex items-center mt-4">
        <Switch checked={inStock} onChange={() => setInStock(!inStock)} />
        <span>Only in Stock</span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="secondary" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
