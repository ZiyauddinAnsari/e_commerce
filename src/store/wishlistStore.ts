import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface WishlistStore {
  items: Product[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  toggleWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      itemCount: 0,

      addItem: (product) => {
        const state = get();
        if (!state.items.find((item) => item.id === product.id)) {
          const newItems = [...state.items, product];
          set({
            items: newItems,
            itemCount: newItems.length,
          });
          toast.success(`Added ${product.name} to wishlist`);
        } else {
          toast.error("Item already in wishlist");
        }
      },

      removeItem: (productId) => {
        const state = get();
        const product = state.items.find((item) => item.id === productId);
        const newItems = state.items.filter((item) => item.id !== productId);
        set({
          items: newItems,
          itemCount: newItems.length,
        });
        if (product) {
          toast.success(`Removed ${product.name} from wishlist`);
        }
      },

      clearWishlist: () => {
        set({ items: [], itemCount: 0 });
        toast.success("Wishlist cleared");
      },

      toggleWishlist: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      isInWishlist: (productId) => {
        const state = get();
        return state.items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
      }),
    }
  )
);
