"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "@/data/products";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100 for slide timer
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();

  // Auto-rotate carousel
  useEffect(() => {
    // Cleanup any existing timers before setting new ones
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }

    if (prefersReducedMotion) return; // respect reduced motion
    if (featuredProducts.length < 2) return; // no auto-rotate for 0/1 item
    if (paused) return; // pause on hover/focus

    const duration = 5000; // 5s per slide
    const tick = 50; // progress updates
    const startDelay = 400; // delay before progress starts
    let elapsed = 0;
    setProgress(0);

    delayTimerRef.current = setTimeout(() => {
      // progress bar timer
      progressTimerRef.current = setInterval(() => {
        elapsed += tick;
        setProgress(Math.min(100, (elapsed / duration) * 100));
        if (elapsed >= duration) {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % featuredProducts.length
          );
          elapsed = 0;
          setProgress(0);
        }
      }, tick);
    }, startDelay);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, [featuredProducts.length, paused, prefersReducedMotion, currentIndex]);

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
        // Get featured products or first 5 products (fix fallback logic)
        const featured = products.filter((p) => p.isFeatured);
        const selected = (featured.length > 0 ? featured : products).slice(
          0,
          5
        );
        setFeaturedProducts(selected);
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
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
    setProgress(0);
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
    <section
      className="relative h-[70vh] min-h-[520px] overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      {/* Dynamic full-bleed background with subtle Ken Burns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700" />
        {featuredProducts.length > 0 && (
          <div className="absolute inset-0">
            <motion.div
              key={`bg-${currentIndex}`}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{
                scale: prefersReducedMotion ? 1 : 1.12,
                opacity: 0.35,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 2.5,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={featuredProducts[currentIndex].images[0]}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </div>
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_20%,_rgba(255,255,255,0.25),_rgba(255,255,255,0)_70%)]" />
      </div>

      {/* Main carousel container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24">
        <div
          className="relative z-10 w-full max-w-7xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchDeltaX.current = 0;
            setPaused(true);
          }}
          onTouchMove={(e) => {
            if (touchStartX.current !== null) {
              touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
            }
          }}
          onTouchEnd={() => {
            const threshold = 50;
            if (touchDeltaX.current > threshold) {
              prevSlide();
            } else if (touchDeltaX.current < -threshold) {
              nextSlide();
            }
            touchStartX.current = null;
            touchDeltaX.current = 0;
            setPaused(false);
          }}
        >
          {/* Progress bar */}
          {featuredProducts.length > 1 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-56 lg:w-64 h-0.5 bg-white/25 rounded-full overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.15)]">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-500 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Carousel */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {featuredProducts.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex justify-center w-full"
                  aria-live="polite"
                >
                  <div className="max-w-6xl w-full px-2 sm:px-6">
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

          {/* Thumbnails / indicators */}
          {featuredProducts.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {featuredProducts.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Go to slide ${i + 1}: ${p.name}`}
                  aria-current={i === currentIndex}
                  onClick={() => {
                    setCurrentIndex(i);
                    setProgress(0);
                  }}
                  className={`relative h-10 w-10 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
                    i === currentIndex
                      ? "ring-white scale-110"
                      : "ring-white/40 hover:ring-white/70"
                  }`}
                >
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Navigation buttons */}
          {featuredProducts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-20 shadow-2xl backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-20 shadow-2xl backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
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
    <Link href={`/products/${product.id}`} className="block group">
      <div className="glass rounded-3xl p-6 md:p-8 lg:p-10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-transform duration-300 cursor-pointer bg-white/10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-white/10 shadow-2xl max-h-[300px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-lg text-white">
                  -{product.discount}%
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-blue-500/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-lg text-white">
                  NEW
                </div>
              )}
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-5 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300 leading-tight tracking-tight">
                {product.name}
              </h3>
              <p className="text-gray-200/90 text-base md:text-lg leading-relaxed line-clamp-3">
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
              <span className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-lg text-gray-300/80 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm"
                aria-label={`Add ${product.name} to cart`}
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
                  e.nativeEvent.stopImmediatePropagation();
                  onAddToWishlist();
                  return false;
                }}
                className={`p-3 rounded-xl border-2 transition-all duration-300 relative z-50 ${
                  isInWishlist
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
                aria-pressed={isInWishlist}
                aria-label={
                  isInWishlist
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              </motion.button>

              <motion.span
                whileHover={{ x: 3 }}
                className="hidden md:inline-flex text-white/90 text-sm font-medium"
              >
                Tap to view details →
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
