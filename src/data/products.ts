import { Product } from "@/types";

// Mock product data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience superior sound quality with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and premium materials.",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    ],
    category: "audio",
    subcategory: "headphones",
    brand: "AudioPro",
    rating: 4.8,
    reviewCount: 256,
    stock: 45,
    tags: ["wireless", "noise-cancelling", "premium"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather headband",
      "High-resolution audio",
      "Touch controls",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
    },
    colors: ["Black", "Silver", "Rose Gold"],
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    discount: 25,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Smart Watch Series X",
    description:
      "The ultimate smartwatch with advanced health monitoring, GPS tracking, and seamless connectivity. Perfect for fitness enthusiasts and tech lovers.",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    category: "wearables",
    subcategory: "smartwatch",
    brand: "TechWatch",
    rating: 4.9,
    reviewCount: 432,
    stock: 32,
    tags: ["smartwatch", "fitness", "health"],
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "7-day battery life",
      "Always-on display",
    ],
    specifications: {
      Display: '1.9" Retina',
      "Battery Life": "7 days",
      "Water Resistance": "50m",
      Connectivity: "Bluetooth 5.0, WiFi",
      Weight: "45g",
    },
    colors: ["Space Gray", "Silver", "Gold"],
    sizes: ["40mm", "44mm"],
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    discount: 20,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Professional Camera Lens",
    description:
      "High-quality professional camera lens with exceptional clarity and precision. Perfect for portrait and landscape photography.",
    price: 899.99,
    originalPrice: 1099.99,
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1495134947056-bf5b1d9677de?w=800&h=800&fit=crop",
    ],
    category: "photography",
    subcategory: "lenses",
    brand: "LensPro",
    rating: 4.7,
    reviewCount: 189,
    stock: 18,
    tags: ["lens", "professional", "photography"],
    features: [
      "Ultra-sharp optics",
      "Weather sealed",
      "Fast autofocus",
      "Image stabilization",
      "Professional grade",
    ],
    specifications: {
      "Focal Length": "85mm",
      Aperture: "f/1.4",
      Mount: "Canon EF",
      Weight: "950g",
      "Filter Size": "77mm",
    },
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    discount: 18,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Gaming Mechanical Keyboard",
    description:
      "Premium mechanical gaming keyboard with RGB lighting, customizable switches, and ultra-responsive performance for competitive gaming.",
    price: 159.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop",
    ],
    category: "gaming",
    subcategory: "keyboards",
    brand: "GamePro",
    rating: 4.6,
    reviewCount: 324,
    stock: 67,
    tags: ["gaming", "mechanical", "rgb"],
    features: [
      "Mechanical switches",
      "RGB backlighting",
      "Programmable keys",
      "Gaming mode",
      "USB-C connectivity",
    ],
    specifications: {
      "Switch Type": "Mechanical Red",
      "Key Layout": "Full size",
      Backlighting: "RGB",
      Connectivity: "USB-C",
      Weight: "1.2kg",
    },
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    discount: 20,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "5",
    name: "Ultra-Thin Laptop",
    description:
      "Powerful ultra-thin laptop with latest processors, all-day battery life, and stunning display. Perfect for professionals and creators.",
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=800&h=800&fit=crop",
    ],
    category: "computers",
    subcategory: "laptops",
    brand: "TechBook",
    rating: 4.8,
    reviewCount: 298,
    stock: 23,
    tags: ["laptop", "ultrabook", "professional"],
    features: [
      '13.3" Retina display',
      "16GB RAM",
      "512GB SSD",
      "12-hour battery",
      "Thunderbolt ports",
    ],
    specifications: {
      Processor: "Intel i7 12th Gen",
      RAM: "16GB",
      Storage: "512GB SSD",
      Display: '13.3" 2K Retina',
      Weight: "1.3kg",
    },
    colors: ["Space Gray", "Silver"],
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    discount: 13,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "6",
    name: "Wireless Gaming Mouse",
    description:
      "High-performance wireless gaming mouse with precision tracking, customizable buttons, and ergonomic design for extended gaming sessions.",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563297007-0686b6ae4078?w=800&h=800&fit=crop",
    ],
    category: "gaming",
    subcategory: "mice",
    brand: "GamePro",
    rating: 4.5,
    reviewCount: 156,
    stock: 89,
    tags: ["gaming", "wireless", "precision"],
    features: [
      "Wireless connectivity",
      "Precision tracking",
      "Customizable buttons",
      "RGB lighting",
      "Ergonomic design",
    ],
    specifications: {
      DPI: "16000",
      Connectivity: "Wireless 2.4GHz",
      "Battery Life": "70 hours",
      Weight: "85g",
      Buttons: "6 programmable",
    },
    colors: ["Black", "White"],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    discount: 25,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
];

// API functions
export const getProducts = async (filters?: any): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  if (filters?.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === filters.category
    );
  }

  if (filters?.search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  if (filters?.priceRange) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
  }

  return filteredProducts;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.find((p) => p.id === id) || null;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts.filter((p) => p.isFeatured);
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockProducts.filter((p) => p.category === category);
};
