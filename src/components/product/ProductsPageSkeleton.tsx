"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <main className="pt-20">
        {/* Page Header Skeleton */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="h-12 md:h-16 bg-white/20 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
              <div className="h-6 bg-blue-100/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Controls Skeleton */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar Skeleton */}
            <div className="flex-1">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Controls Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse lg:hidden"></div>
              <div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar Skeleton */}
            <div className="hidden lg:block w-80">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-20 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-28 animate-pulse"></div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-36 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              {/* Results Count Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
