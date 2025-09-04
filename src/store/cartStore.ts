import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, CartState } from "@/types";
import toast from "react-hot-toast";

interface CartStore extends CartState {
  addItem: (
    product: Product,
    quantity?: number,
    options?: { color?: string; size?: string }
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemQuantity: (productId: string) => number;
  calculateTotal: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isOpen: false,

      addItem: (product, quantity = 1, options = {}) => {
        const state = get();
        const existingItemIndex = state.items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor === options.color &&
            item.selectedSize === options.size
        );

        if (existingItemIndex > -1) {
          // Update existing item
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success(`Updated ${product.name} quantity`);
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            selectedColor: options.color,
            selectedSize: options.size,
            addedAt: new Date().toISOString(),
          };
          set({ items: [...state.items, newItem] });
          toast.success(`Added ${product.name} to cart`);
        }

        get().calculateTotal();
      },

      removeItem: (itemId) => {
        const state = get();
        const item = state.items.find((item) => item.id === itemId);
        if (item) {
          set({ items: state.items.filter((item) => item.id !== itemId) });
          toast.success(`Removed ${item.product.name} from cart`);
          get().calculateTotal();
        }
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const state = get();
        const updatedItems = state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
        get().calculateTotal();
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
        toast.success("Cart cleared");
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getItemQuantity: (productId) => {
        const state = get();
        return state.items
          .filter((item) => item.product.id === productId)
          .reduce((total, item) => total + item.quantity, 0);
      },

      calculateTotal: () => {
        const state = get();
        const total = state.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const itemCount = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        set({ total, itemCount });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
);
