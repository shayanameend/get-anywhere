import { NextRequest, NextResponse } from "next/server";
import { stripe, StripeCharge, StripeEvent } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export default async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");

  let event: StripeEvent;

  try {
    event = stripe.webhooks.constructEvent(
      await request.json(),
      signature!,
      process.env.STRIP_WEBHOOKS_SECRET!
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);

    return NextResponse.json({}, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object as StripeCharge;
      if (charge.payment_intent) {
        await prisma.order.update({
          where: { paymentIntentId: charge.payment_intent.toString() },
          data: { status: "complete" },
        });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  return NextResponse.json({});
}
