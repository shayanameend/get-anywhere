"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { CartCheckOut, CartItems, CartSuccess } from "@/components";
import { useIsHyderated } from "@/hooks";
import { useCartStore } from "@/lib/store";

export default function Cart() {
  const isHyderated = useIsHyderated();
  const { toggleIsCartOpen, cartStatus } = useCartStore();

  return (
    <section
      className="bg-white w-2/6 p-12 absolute top-0 right-0 h-full"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <header>
        <button className="text-xl" onClick={toggleIsCartOpen}>
          <FaArrowLeftLong />
        </button>
      </header>
      <main className="py-4">
        {isHyderated && cartStatus === "items" && <CartItems />}
        {isHyderated && cartStatus === "checkout" && <CartCheckOut />}
        {isHyderated && cartStatus === "success" && <CartSuccess />}
      </main>
    </section>
  );
}
