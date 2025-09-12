import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/data/products";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import ProductPagination from "@/components/product/ProductPagination";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    resultCount,
  } = useProductFilters(products);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // Add a small delay to prevent flash
        setTimeout(() => setLoading(false), 100);
      }
    };

    fetchProducts();
  }, []);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && products.length > 0) {
      updateFilter({ category });
    }
  }, [searchParams, products.length, updateFilter]);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover our curated collection of premium products designed to
              elevate your lifestyle
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Sort */}
            <select
              value={`${filters.sortBy || ""}-${filters.sortOrder || ""}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split("-");
                updateFilter({
                  sortBy:
                    (sortBy as
                      | "name"
                      | "price"
                      | "rating"
                      | "newest"
                      | "popularity") || undefined,
                  sortOrder: (sortOrder as "asc" | "desc") || undefined,
                });
              }}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="-">Sort by</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="rating-desc">Rating High-Low</option>
              <option value="newest-desc">Newest First</option>
              <option value="popularity-desc">Most Popular</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Filters Sidebar - Moved to Left */}
          <div
            className={`lg:block ${showFilters ? "block" : "hidden"} w-full lg:w-64 flex-shrink-0`}
          >
            <ProductFilters
              filters={filters}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              products={products}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                products
                {filteredProducts.length !== products.length &&
                  ` (filtered from ${products.length} total)`}
              </p>
              {(searchQuery || Object.keys(filters).length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're
                  looking for
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {paginatedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
