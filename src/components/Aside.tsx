"use client";

import { Cart } from "@/components";
import { useIsHyderated } from "@/hooks";
import { useCartStore } from "@/lib/store";

export default function Aside() {
  const isHyderated = useIsHyderated();
  const { isCartOpen, toggleIsCartOpen } = useCartStore();

  if (isHyderated && isCartOpen) {
    return (
      <aside
        className="fixed top-0 left-0 bg-black/25 w-full h-full"
        onClick={toggleIsCartOpen}
      >
        <Cart />
      </aside>
    );
  }

  return <></>;
}
