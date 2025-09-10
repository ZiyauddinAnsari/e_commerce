/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";

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

describe("useCartStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.getState().clearCart();
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.name).toBe("Test Product");
    expect(result.current.total).toBe(99.99);
  });

  it("should increase quantity when adding same item", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.total).toBe(199.98);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    const itemId = result.current.items[0].id;

    act(() => {
      result.current.removeItem(itemId);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should update item quantity", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.updateQuantity(itemId, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.total).toBeCloseTo(299.97);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("should calculate correct total with multiple items", () => {
    const { result } = renderHook(() => useCartStore());

    const product2 = { ...mockProduct, id: "2", price: 49.99 };

    act(() => {
      result.current.addItem(mockProduct, 2);
      result.current.addItem(product2, 1);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.total).toBeCloseTo(249.97); // (99.99 * 2) + 49.99
  });
});
