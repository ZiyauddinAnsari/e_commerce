"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils/format";
import { Product } from "@/types";

export default function WishlistDrawer() {
  const { items, isOpen, toggleWishlist, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeItem(product.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  My Wishlist
                </h2>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={toggleWishlist}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <Heart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Save items you love for later
                  </p>
                  <Link
                    href="/products"
                    onClick={toggleWishlist}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.id}`}
                        onClick={toggleWishlist}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.id}`}
                          onClick={toggleWishlist}
                          className="block"
                        >
                          <h3 className="text-sm font-medium text-gray-900 truncate hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {formatCurrency(item.price)}
                          </p>
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <p className="text-xs text-gray-500 line-through">
                                {formatCurrency(item.originalPrice)}
                              </p>
                            )}
                        </Link>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMoveToCart(item)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Move to Cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeItem(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                <Link
                  href="/products"
                  onClick={toggleWishlist}
                  className="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/account?tab=wishlist"
                  onClick={toggleWishlist}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Full Wishlist
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
