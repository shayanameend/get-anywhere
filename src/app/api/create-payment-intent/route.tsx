import { NextRequest, NextResponse } from "next/server";
import { calculateTotalPrice } from "@/lib/prices";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function POST(request: NextRequest) {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return NextResponse.json(
      { message: "User Not Logged In" },
      { status: 403 }
    );
  }

  const { cart } = await request.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateTotalPrice(cart),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ paymentIntent });
}
