import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Slider,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  FormGroup,
  Switch,
  Box,
} from "@mui/material";
import { Product } from "../types/ProductType";
import { FaFilter } from "react-icons/fa"; // Added an icon for style
import { apiUrl } from "../services/api";

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
    axios.get(`${apiUrl}`).then((response) => {
      const products: Product[] = response.data.products;

      // Extract unique categories
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);

      // Count occurrences of each brand
      const brandCounts: { [key: string]: number } = {};
      products.forEach((product) => {
        if (product.brand) {
          brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
        }
      });

      // Filter out brands with no products and sort alphabetically
      const filteredBrands = Object.keys(brandCounts)
        .filter((brand) => brandCounts[brand] > 0)
        .sort();
      setBrands(filteredBrands);
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
    setPriceRange([5, 5000]);
    setInStock(false);
    onFilter({
      categories: [],
      brands: [],
      priceRange: [5, 5000],
      inStock: false,
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        boxShadow: 3,
        borderRadius: 2,
        padding: 3,
        width: "100%",
        maxWidth: 380,
        height: 350, // reduced height for shorter filter area
        overflowY: "auto", // make it scrollable if content overflows
        scrollbarWidth: "none", // for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // for Chrome, Safari, Opera
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <FaFilter style={{ marginRight: "0.5rem" }} /> Filters
      </Typography>

      <Grid container spacing={1}>
        {/* Categories */}
        <Grid item xs={6}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "0.85rem", color: "#888" }}
          >
            Category
          </Typography>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    color="primary"
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Brands */}
        <Grid item xs={6}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "0.85rem", color: "#888" }} // Light text for brands
          >
            Brand
          </Typography>
          <Box
            sx={{
              maxHeight: 150,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // for Chrome, Safari, Opera
              },
            }}
          >
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    color="primary"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", fontWeight: "normal" }}
                  >
                    {brand}
                  </Typography>
                }
              />
            ))}
          </Box>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: 1, fontSize: "0.85rem" }}
          >
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={5}
            max={5000}
            valueLabelFormat={(value) => `$${value}`}
          />
        </Grid>

        {/* In Stock */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                color="primary"
              />
            }
            label="Only In Stock"
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          onClick={applyFilters}
          className="bg-deep-blue text-white hover:bg-deep-blue" // Tailwind deep-blue
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          onClick={resetFilters}
          className="bg-golden-yellow text-black hover:bg-golden-yellow" // Tailwind golden-yellow
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
