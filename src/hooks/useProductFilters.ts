"use client";

import { useState, useMemo, useCallback } from "react";
import { Product, FilterOptions } from "@/types";

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (
        filters.brand &&
        filters.brand.length > 0 &&
        !filters.brand.includes(product.brand)
      ) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stock <= 0) {
        return false;
      }

      // New products filter
      if (filters.isNew && !product.isNew) {
        return false;
      }

      // Featured products filter
      if (filters.isFeatured && !product.isFeatured) {
        return false;
      }

      return true;
    });
  }, [products, filters, searchQuery]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (filters.sortBy) {
      sorted.sort((a, b) => {
        let comparison = 0;

        switch (filters.sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "price":
            comparison = a.price - b.price;
            break;
          case "rating":
            comparison = a.rating - b.rating;
            break;
          case "newest":
            comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case "popularity":
            comparison = a.reviewCount - b.reviewCount;
            break;
          default:
            return 0;
        }

        return filters.sortOrder === "desc" ? -comparison : comparison;
      });
    }

    return sorted;
  }, [filteredProducts, filters.sortBy, filters.sortOrder]);

  const updateFilter = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery("");
  }, []);

  return {
    filteredProducts: sortedProducts,
    filters,
    searchQuery,
    setSearchQuery,
    updateFilter,
    clearFilters,
    resultCount: sortedProducts.length,
  };
};
