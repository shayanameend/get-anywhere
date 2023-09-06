"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/lib/store";
import { calculateTotalPrice, formatPriceUSD } from "@/lib/prices";

interface Props {
  clientSecret: string;
}

export default function CheckOutForm({ clientSecret }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { setCartStatus, cart } = useCartStore();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!error) {
      setCartStatus("success");
    }

    setIsLoading(false);
  }

  const paymentElementOptions: StripePaymentElementOptions = { layout: "tabs" };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        className="mb-3"
        options={paymentElementOptions}
      />
      <p className="mb-3 text-sm pl-1">
        Total Price: {formatPriceUSD(calculateTotalPrice(cart))}
      </p>
      <button
        id="submit"
        className="uppercase bg-indigo-700 text-sm text-white rounded-lg px-6 w-full py-3"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">{isLoading ? "Paying" : "Pay Now"}</span>
      </button>
    </form>
  );
}
