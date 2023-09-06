import { NextRequest, NextResponse } from "next/server";
import { calculateTotalPrice } from "@/lib/prices";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CartItemType } from "@/lib/store";

export async function POST(request: NextRequest) {
  const { user } =
    ((await getServerSession(authOptions)) as { user: User }) || {};
  if (!user) {
    return NextResponse.json(
      { message: "User Not Logged In" },
      { status: 403 }
    );
  }

  let { cart, paymentIntentId } = (await request.json()) as {
    cart: CartItemType[];
    paymentIntentId: string;
  };

  if (paymentIntentId) {
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent) {
      paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: calculateTotalPrice(cart),
      });
    }

    const order = await prisma.order.findFirst({
      where: { paymentIntentId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Invalid Payment Intent" },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        price: calculateTotalPrice(cart),
        items: {
          deleteMany: {},
          create: cart.map(
            ({ name, description, image, price, currency, quantity }) => {
              return { name, description, image, price, currency, quantity };
            }
          ),
        },
      },
    });

    return NextResponse.json({ paymentIntent });
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      customer: user.stripeCustomerId!,
      amount: calculateTotalPrice(cart),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: {
        user: { connect: { id: user.id } },
        price: calculateTotalPrice(cart),
        currency: "usd",
        status: "pending",
        paymentIntentId,
        items: {
          create: cart.map(
            ({ name, description, image, price, currency, quantity }) => {
              return { name, description, image, price, currency, quantity };
            }
          ),
        },
      },
    });

    return NextResponse.json({ paymentIntent });
  }
}
