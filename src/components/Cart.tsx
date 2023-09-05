"use client";

import { FaArrowLeftLong } from "react-icons/fa6";
import { CartCheckOut, CartItems, CartSuccess } from "@/components";
import { useIsHyderated } from "@/hooks";
import { useCartStore } from "@/lib/store";

export default function Cart() {
  const isHyderated = useIsHyderated();
  const { toggleIsCartOpen, cartStatus, setCartStatus } = useCartStore();

  return (
    <section
      className="bg-white w-2/6 p-12 absolute top-0 right-0 h-full"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <header>
        <button
          className="text-xl"
          onClick={
            cartStatus === "items"
              ? toggleIsCartOpen
              : () => {
                  setCartStatus("items");
                }
          }
        >
          <FaArrowLeftLong />
        </button>
      </header>
      <main className="py-4 h-full">
        {isHyderated && cartStatus === "items" && <CartItems />}
        {isHyderated && cartStatus === "checkout" && <CartCheckOut />}
        {isHyderated && cartStatus === "success" && <CartSuccess />}
      </main>
    </section>
  );
}
