"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

export default function CartSuccess() {
  const { clearCart, paymentIntentId, setPaymentIntentId } = useCartStore();

  useEffect(() => {
    fetch("/api/payment-success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    });

    clearCart();
    setPaymentIntentId("");
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-full">
      <h2>Payment Successfull</h2>
    </section>
  );
}
