"use client";

import { CartItemType, useCartStore } from "@/lib/store";

interface Props {
  item: CartItemType;
}

export default function AddToCartButton({ item }: Props) {
  const { addItem } = useCartStore();

  return (
    <button
      className="uppercase bg-indigo-700 text-sm text-white rounded-lg px-6 w-full py-3"
      onClick={() => {
        addItem(item);
      }}
    >
      Add to cart
    </button>
  );
}
