import { render, screen, fireEvent } from "@testing-library/react";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

// Mock the cart store
jest.mock("@/store/cartStore");

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "Test Description",
  price: 99.99,
  originalPrice: 129.99,
  images: ["/test-image.jpg"],
  category: "Electronics",
  brand: "Test Brand",
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  tags: ["test"],
  features: ["Feature 1"],
  specifications: { "Test Spec": "Test Value" },
  isNew: true,
  isFeatured: false,
  isBestSeller: false,
  discount: 23,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

const mockAddItem = jest.fn();
const mockToggleWishlist = jest.fn();

beforeEach(() => {
  (useCartStore as jest.Mock).mockReturnValue({
    addItem: mockAddItem,
    toggleWishlist: mockToggleWishlist,
    wishlistItems: [],
  });
});

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("$129.99")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("displays discount badge when product has discount", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("23% OFF")).toBeInTheDocument();
  });

  it("shows NEW badge for new products", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("calls addItem when add to cart button is clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith({
      id: expect.any(String),
      product: mockProduct,
      quantity: 1,
      addedAt: expect.any(String),
    });
  });

  it("shows low stock warning when stock is less than 5", () => {
    const lowStockProduct = { ...mockProduct, stock: 3 };
    render(<ProductCard product={lowStockProduct} />);

    expect(screen.getByText("Only 3 left!")).toBeInTheDocument();
  });

  it("shows out of stock when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });
});
