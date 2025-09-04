"use client";

import { motion } from "framer-motion";
import { X, Star } from "lucide-react";
import { FilterOptions, Product } from "@/types";
import { formatCurrency } from "@/utils/format";

interface ProductFiltersProps {
  filters: FilterOptions;
  updateFilter: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  products: Product[];
}

export default function ProductFilters({
  filters,
  updateFilter,
  clearFilters,
  products,
}: ProductFiltersProps) {
  // Extract unique values from products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const colors = Array.from(new Set(products.flatMap((p) => p.colors || [])));
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])));

  // Price range
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilter({ priceRange: [min, max] });
  };

  const handleBrandToggle = (brand: string) => {
    const currentBrands = filters.brand || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    updateFilter({ brand: newBrands.length > 0 ? newBrands : undefined });
  };

  const handleColorToggle = (color: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color];
    updateFilter({ colors: newColors.length > 0 ? newColors : undefined });
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Category
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() =>
                    updateFilter({
                      category:
                        filters.category === category ? undefined : category,
                    })
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {category}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  {products.filter((p) => p.category === category).length}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Price Range
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                min={minPrice}
                max={maxPrice}
                value={filters.priceRange?.[0] || ""}
                onChange={(e) => {
                  const min = parseInt(e.target.value) || minPrice;
                  const max = filters.priceRange?.[1] || maxPrice;
                  handlePriceRangeChange(min, max);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                min={minPrice}
                max={maxPrice}
                value={filters.priceRange?.[1] || ""}
                onChange={(e) => {
                  const max = parseInt(e.target.value) || maxPrice;
                  const min = filters.priceRange?.[0] || minPrice;
                  handlePriceRangeChange(min, max);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-gray-500">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Rating
          </h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() =>
                    updateFilter({
                      rating: filters.rating === rating ? undefined : rating,
                    })
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                    {rating}+ stars
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Brand
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brand?.includes(brand) || false}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {brand}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  {products.filter((p) => p.brand === brand).length}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        {colors.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border-2 transition-colors ${
                    filters.colors?.includes(color)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="text-xs">{color}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stock */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Availability
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock || false}
                onChange={(e) =>
                  updateFilter({ inStock: e.target.checked || undefined })
                }
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                In Stock Only
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isNew || false}
                onChange={(e) =>
                  updateFilter({ isNew: e.target.checked || undefined })
                }
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                New Products
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isFeatured || false}
                onChange={(e) =>
                  updateFilter({ isFeatured: e.target.checked || undefined })
                }
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Featured Products
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
