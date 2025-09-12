import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye, Share2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.origin + `/products/${product.id}`,
      });
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                Best Seller
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-500 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Quick View */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-medium flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Quick View</span>
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="font-medium">{product.brand}</span>
            <span className="capitalize">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-orange-500 font-medium">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              product.stock === 0
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}
