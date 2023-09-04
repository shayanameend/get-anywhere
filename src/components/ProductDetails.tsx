"use client";

import { useState } from "react";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { formatPriceUSD } from "@/lib/prices";
import { ProductType } from "@/lib/products";

interface Props {
  product: ProductType;
}

export default function ProductDetails({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <h2 className="text-3xl font-medium mb-2">{product.name}</h2>
      <p className="text-gray-700 text-sm mb-1">{product.description}</p>
      <p className="text-indigo-700 font-bold mb-1">
        {formatPriceUSD(product.price * quantity)}
      </p>
      <div className="mb-3 flex gap-2 items-center">
        <button
          onClick={() => {
            setQuantity(quantity > 1 ? quantity - 1 : quantity);
          }}
        >
          <FaCircleMinus />
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          <FaCirclePlus />
        </button>
      </div>
      <button className="uppercase bg-indigo-700 text-sm text-white rounded-lg border-none px-6 w-full py-3">
        Add to cart
      </button>
    </>
  );
}
