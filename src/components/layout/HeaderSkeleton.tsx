"use client";

export default function HeaderSkeleton() {
  return (
    <header className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <div className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopVibe
            </div>
          </div>

          {/* Desktop Navigation skeleton */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'Categories', 'About', 'Contact'].map((item) => (
              <div key={item} className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>

          {/* Right side icons skeleton */}
          <div className="flex items-center space-x-4">
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse md:hidden" />
          </div>
        </div>
      </nav>
    </header>
  );
}
