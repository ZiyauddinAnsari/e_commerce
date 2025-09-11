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
  {
    id: "7",
    name: "4K Webcam Pro",
    description:
      "Professional 4K webcam with auto-focus, built-in microphone, and privacy cover. Perfect for streaming, video calls, and content creation.",
    price: 189.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1518997856474-71e5ba47c9aa?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    subcategory: "cameras",
    brand: "StreamTech",
    rating: 4.6,
    reviewCount: 134,
    stock: 28,
    tags: ["4k", "streaming", "webcam"],
    features: [
      "4K Ultra HD recording",
      "Auto-focus technology",
      "Built-in stereo microphone",
      "Privacy cover included",
      "USB-C connectivity",
    ],
    specifications: {
      Resolution: "3840 x 2160",
      "Frame Rate": "30fps",
      "Field of View": "90 degrees",
      Connection: "USB-C",
      Microphone: "Built-in stereo",
    },
    colors: ["Black", "White"],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    discount: 24,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "8",
    name: "Gaming Mechanical Keyboard",
    description:
      "RGB backlit mechanical keyboard with cherry MX switches, programmable keys, and aluminum frame. Built for gaming performance.",
    price: 159.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop",
    ],
    category: "computers",
    subcategory: "keyboards",
    brand: "GameForce",
    rating: 4.7,
    reviewCount: 289,
    stock: 52,
    tags: ["gaming", "mechanical", "rgb"],
    features: [
      "Cherry MX Blue switches",
      "RGB backlighting",
      "Programmable keys",
      "Aluminum frame",
      "Anti-ghosting",
    ],
    specifications: {
      "Switch Type": "Cherry MX Blue",
      Backlighting: "RGB",
      Connection: "USB-A",
      Layout: "Full-size",
      Material: "Aluminum",
    },
    colors: ["Black", "Silver"],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    discount: 20,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "9",
    name: "Wireless Gaming Mouse",
    description:
      "High-performance wireless gaming mouse with 16000 DPI sensor, customizable buttons, and 70-hour battery life.",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop",
    ],
    category: "computers",
    subcategory: "mice",
    brand: "GameForce",
    rating: 4.5,
    reviewCount: 167,
    stock: 73,
    tags: ["wireless", "gaming", "high-dpi"],
    features: [
      "16,000 DPI sensor",
      "70-hour battery life",
      "Customizable buttons",
      "RGB lighting",
      "Ergonomic design",
    ],
    specifications: {
      DPI: "16,000",
      "Battery Life": "70 hours",
      Connection: "Wireless 2.4GHz",
      Buttons: "8 programmable",
      Weight: "85g",
    },
    colors: ["Black", "White"],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    discount: 20,
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "10",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact waterproof Bluetooth speaker with 360-degree sound, 24-hour battery, and voice assistant support.",
    price: 129.99,
    originalPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop",
    ],
    category: "audio",
    subcategory: "speakers",
    brand: "SoundWave",
    rating: 4.4,
    reviewCount: 198,
    stock: 41,
    tags: ["bluetooth", "waterproof", "portable"],
    features: [
      "360-degree sound",
      "IPX7 waterproof",
      "24-hour battery",
      "Voice assistant support",
      "Compact design",
    ],
    specifications: {
      "Battery Life": "24 hours",
      "Water Rating": "IPX7",
      Connectivity: "Bluetooth 5.0",
      Weight: "450g",
      Range: "30 feet",
    },
    colors: ["Blue", "Black", "Red"],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    discount: 13,
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    id: "11",
    name: "Professional DSLR Camera",
    description:
      "Full-frame DSLR camera with 45MP sensor, 4K video recording, and weather sealing. Perfect for professional photography.",
    price: 1899.99,
    originalPrice: 2199.99,
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop",
    ],
    category: "photography",
    subcategory: "cameras",
    brand: "ProPhoto",
    rating: 4.9,
    reviewCount: 87,
    stock: 12,
    tags: ["dslr", "professional", "full-frame"],
    features: [
      "45MP full-frame sensor",
      "4K video recording",
      "Weather sealing",
      "Dual card slots",
      "In-body stabilization",
    ],
    specifications: {
      Sensor: "45MP Full-Frame",
      Video: "4K 30fps",
      "ISO Range": "100-51200",
      "Shutter Speed": "1/8000s",
      Weight: "850g",
    },
    colors: ["Black"],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    discount: 14,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "12",
    name: "Gaming Headset RGB",
    description:
      "Immersive gaming headset with 7.1 surround sound, RGB lighting, and crystal-clear microphone for competitive gaming.",
    price: 99.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    ],
    category: "gaming",
    subcategory: "headsets",
    brand: "GameSound",
    rating: 4.3,
    reviewCount: 245,
    stock: 67,
    tags: ["gaming", "rgb", "surround-sound"],
    features: [
      "7.1 surround sound",
      "RGB lighting effects",
      "Noise-canceling microphone",
      "Memory foam ear cups",
      "Multi-platform support",
    ],
    specifications: {
      "Driver Size": "50mm",
      Frequency: "20Hz-20kHz",
      Microphone: "Detachable",
      Connection: "USB + 3.5mm",
      Weight: "320g",
    },
    colors: ["Black", "Red"],
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    discount: 23,
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
  },
  {
    id: "13",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad with 15W output, LED indicator, and anti-slip design. Compatible with all Qi-enabled devices.",
    price: 39.99,
    originalPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1575909812264-6902b55846ad?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544976425-6e5b6bb9f7d9?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    subcategory: "chargers",
    brand: "PowerUp",
    rating: 4.2,
    reviewCount: 156,
    stock: 89,
    tags: ["wireless", "charging", "qi-enabled"],
    features: [
      "15W fast charging",
      "LED charging indicator",
      "Anti-slip design",
      "Over-charge protection",
      "Universal compatibility",
    ],
    specifications: {
      Output: "15W max",
      Input: "USB-C",
      Compatibility: "Qi-enabled devices",
      Dimensions: "4 x 4 x 0.4 inches",
      Weight: "120g",
    },
    colors: ["Black", "White"],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    discount: 20,
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "14",
    name: "USB-C Hub 7-in-1",
    description:
      "Compact 7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Perfect for laptops and tablets.",
    price: 69.99,
    originalPrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588502578927-c7d23d9de6ec?w=800&h=800&fit=crop",
    ],
    category: "computers",
    subcategory: "accessories",
    brand: "ConnectPro",
    rating: 4.6,
    reviewCount: 203,
    stock: 45,
    tags: ["usb-c", "hub", "multi-port"],
    features: [
      "7-in-1 connectivity",
      "4K HDMI output",
      "100W power delivery",
      "USB 3.0 ports",
      "SD/microSD reader",
    ],
    specifications: {
      Ports: "7 (HDMI, USB-A x3, USB-C, SD, microSD)",
      HDMI: "4K@60Hz",
      "Power Delivery": "100W",
      "Data Transfer": "USB 3.0 5Gbps",
      Compatibility: "USB-C devices",
    },
    colors: ["Space Gray", "Silver"],
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    discount: 22,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
  },
  {
    id: "15",
    name: "Smart Home Security Camera",
    description:
      "WiFi security camera with 2K resolution, night vision, motion detection, and cloud storage. Monitor your home remotely.",
    price: 149.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580752300992-559f8e0734e0?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    subcategory: "security",
    brand: "HomeSafe",
    rating: 4.5,
    reviewCount: 178,
    stock: 33,
    tags: ["security", "wifi", "smart-home"],
    features: [
      "2K HD resolution",
      "Night vision",
      "Motion detection alerts",
      "Two-way audio",
      "Cloud storage included",
    ],
    specifications: {
      Resolution: "2K (2560x1440)",
      "Night Vision": "Up to 30 feet",
      "Field of View": "130 degrees",
      Storage: "Cloud + microSD",
      Connectivity: "WiFi 2.4GHz/5GHz",
    },
    colors: ["White", "Black"],
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    discount: 25,
    createdAt: "2024-02-12T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },
  {
    id: "16",
    name: "Ergonomic Office Chair",
    description:
      "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long work sessions.",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
    ],
    category: "furniture",
    subcategory: "chairs",
    brand: "ErgoMax",
    rating: 4.7,
    reviewCount: 142,
    stock: 25,
    tags: ["ergonomic", "office", "comfort"],
    features: [
      "Lumbar support",
      "Adjustable height",
      "Breathable mesh back",
      "Padded armrests",
      "360-degree swivel",
    ],
    specifications: {
      "Weight Capacity": "300 lbs",
      "Height Range": "42-46 inches",
      "Seat Width": "20 inches",
      Material: "Mesh + Foam",
      Warranty: "5 years",
    },
    colors: ["Black", "Gray"],
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    discount: 25,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
];

// API functions
// Cache for products to avoid repeated API calls
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getProducts = async (filters?: any): Promise<Product[]> => {
  // Check if we have cached data that's still valid
  const now = Date.now();
  if (cachedProducts && now - cacheTimestamp < CACHE_DURATION) {
    // Still use a short delay for UX consistency, but much shorter
    await new Promise((resolve) => setTimeout(resolve, 100));
    return applyFilters([...cachedProducts], filters);
  }

  // Simulate API delay (reduced from 500ms to 200ms)
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Cache the products
  cachedProducts = [...mockProducts];
  cacheTimestamp = now;

  return applyFilters([...mockProducts], filters);
};

// Helper function to apply filters
function applyFilters(products: Product[], filters?: any): Product[] {
  let filteredProducts = products;

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
}

// Pre-load products for better performance
export const preloadProducts = () => {
  if (typeof window !== "undefined" && !cachedProducts) {
    // Pre-load products in the background without showing loading state
    getProducts().catch(console.error);
  }
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
