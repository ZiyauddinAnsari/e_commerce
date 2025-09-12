"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// Image component replaced with regular img
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "@/data/products";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  // Auto-rotate carousel
  useEffect(() => {
    if (featuredProducts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (featuredProducts.length === 0) return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [featuredProducts.length]);

  // Load featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getProducts();
        // Get featured products or first 5 products
        const featured =
          products.filter((p) => p.isFeatured).slice(0, 5) ||
          products.slice(0, 5);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item: Product) => item.id === productId);
  };

  if (loading) {
    return (
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading Products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      </div>

      {/* Main carousel container */}
      <div className="relative z-10 w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          {/* <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-200 mb-6"
          >
            Discover our handpicked collection of premium products
          </motion.p> */}
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Reduced height container */}
          <div className="min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {featuredProducts.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center w-full"
                >
                  <div className="max-w-5xl w-full px-8">
                    <ProductSlide
                      product={featuredProducts[currentIndex]}
                      onAddToCart={() =>
                        handleAddToCart(featuredProducts[currentIndex])
                      }
                      onAddToWishlist={() =>
                        handleAddToWishlist(featuredProducts[currentIndex])
                      }
                      isInWishlist={isInWishlist(
                        featuredProducts[currentIndex].id
                      )}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-20 shadow-2xl"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-20 shadow-2xl"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Enhanced Dots indicator - Hidden */}
          {/* <div className="flex justify-center space-x-3 mt-6">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

// Product Slide Component
interface ProductSlideProps {
  product: Product;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
  isInWishlist: boolean;
}

function ProductSlide({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}: ProductSlideProps) {
  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="glass rounded-2xl p-6 md:p-8 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white/10 shadow-2xl max-h-[250px]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  -{product.discount}%
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  NEW
                </div>
              )}
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                {product.name}
              </h3>
              <p className="text-gray-200 text-base leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">
                {product.rating}
              </span>
              <span className="text-gray-300 text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="text-3xl md:text-4xl font-bold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToWishlist();
                }}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  isInWishlist
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
