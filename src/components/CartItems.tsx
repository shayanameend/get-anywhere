"use client";

import Image from "next/image";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { calculateTotalPrice, formatPriceUSD } from "@/lib/prices";
import { useCartStore } from "@/lib/store";

export default function CartItems() {
  const { setCartStatus, cart, addItem, removeItem } = useCartStore();

  if (cart.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <h2>No Items</h2>
      </section>
    );
  }

  return (
    <section className="overflow-y-auto">
      <ul>
        {cart.map((cartItem) => {
          return (
            <li key={cartItem.id}>
              <article className="flex gap-4 items-center mb-4">
                <div>
                  <Image
                    className="w-40 h-28 rounded-lg"
                    src={cartItem.image}
                    alt={cartItem.name}
                    width={160}
                    height={112}
                  />
                </div>
                <div>
                  <h2 className="text-xl mb-1 font-medium">{cartItem.name}</h2>
                  <p className="text-sm mb-0.5 text-violet-700">
                    {formatPriceUSD(cartItem.price * cartItem.quantity)}
                  </p>
                  <div className="mb-3 text-sm flex gap-2 items-center text-gray-700">
                    <button
                      onClick={() => {
                        removeItem(cartItem);
                      }}
                    >
                      <FaCircleMinus />
                    </button>
                    <p>{cartItem.quantity}</p>
                    <button
                      onClick={() => {
                        addItem({ ...cartItem, quantity: 1 });
                      }}
                    >
                      <FaCirclePlus />
                    </button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="mb-3 text-sm pl-1">
        Total Price: {formatPriceUSD(calculateTotalPrice(cart))}
      </p>
      <button
        className="uppercase bg-indigo-700 text-sm text-white rounded-lg px-6 w-full py-3"
        onClick={() => {
          setCartStatus("checkout");
        }}
      >
        Checkout
      </button>
    </section>
  );
}
