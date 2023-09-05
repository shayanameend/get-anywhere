import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreType {
  isCartOpen: boolean;
  toggleIsCartOpen: () => void;
  cartStatus: string;
  setCartStatus: (newStatus: string) => void;
}

export const useCartStore = create<StoreType>()(
  persist(
    (set) => {
      return {
        isCartOpen: false,
        toggleIsCartOpen() {
          set((state) => {
            return { isCartOpen: !state.isCartOpen };
          });
        },
        cartStatus: "items",
        setCartStatus(newStatus) {
          set(() => {
            return { cartStatus: newStatus };
          });
        },
      };
    },
    {
      name: "cart-store",
    }
  )
);
