"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckOutForm } from "@/components";
import { useCartStore } from "@/lib/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!);

export default function CartCheckOut() {
  const router = useRouter();
  const [clientSecret, setCientSecret] = useState("");
  const { cart } = useCartStore();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    })
      .then((response) => {
        if (response.status === 403) {
          router.push("/api/auth/signin");
        }

        return response.json();
      })
      .then((data) => setCientSecret(data.paymentIntent.client_secret));
  }, []);

  const options: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
    clientSecret: clientSecret,
  };

  return (
    <section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </section>
  );
}
