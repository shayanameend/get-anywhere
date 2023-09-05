import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "@/lib/products";

export interface CartItemType extends ProductType {
  quantity: number;
}

interface StoreType {
  isCartOpen: boolean;
  toggleIsCartOpen: () => void;
  cartStatus: string;
  setCartStatus: (newStatus: string) => void;
  cart: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (item: CartItemType) => void;
  clearCart: () => void;
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
        cart: [],
        addItem(item) {
          set((state) => {
            const existiingItem = state.cart.find((cartItem) => {
              return cartItem.id === item.id;
            });

            if (existiingItem) {
              return {
                cart: state.cart.map((cartItem) => {
                  if (cartItem.id === item.id) {
                    cartItem.quantity = cartItem.quantity + item.quantity;
                  }

                  return cartItem;
                }),
              };
            } else {
              return { cart: [...state.cart, item] };
            }
          });
        },
        removeItem(item) {
          set((state) => {
            if (item.quantity > 1) {
              return {
                cart: state.cart.map((cartItem) => {
                  if (cartItem.id === item.id) {
                    --cartItem.quantity;
                  }

                  return cartItem;
                }),
              };
            } else {
              return {
                cart: state.cart.filter((cartItem) => {
                  return cartItem.id !== item.id;
                }),
              };
            }
          });
        },
        clearCart() {
          set(() => {
            return { cart: [] };
          });
        },
      };
    },
    {
      name: "cart-store",
    }
  )
);
