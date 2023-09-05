"use client";

import { FaBagShopping } from "react-icons/fa6";
import { useCartStore } from "@/lib/store";

export default function CartButton() {
  const { toggleIsCartOpen } = useCartStore();

  return (
    <button className="text-3xl text-gray-700" onClick={toggleIsCartOpen}>
      <FaBagShopping />
    </button>
  );
}
