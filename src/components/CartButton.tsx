"use client";

import { FaBagShopping } from "react-icons/fa6";
import { useIsHyderated } from "@/hooks";
import { useCartStore } from "@/lib/store";

export default function CartButton() {
  const isHyderated = useIsHyderated();
  const { toggleIsCartOpen, cart } = useCartStore();

  return (
    <button
      className="relative text-3xl text-gray-700"
      onClick={toggleIsCartOpen}
    >
      {isHyderated && cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-indigo-700 rounded-full font-medium text-white px-2 py-0.5 text-xs">
          {cart.length}
        </span>
      )}
      <FaBagShopping />
    </button>
  );
}
