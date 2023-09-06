import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { paymentIntentId } = (await request.json()) as {
    paymentIntentId: string;
  };

  if (paymentIntentId) {
    const order = await prisma.order.findFirst({
      where: { paymentIntentId },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Invalid Payment Intent" },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "success" },
    });

    return NextResponse.json({});
  }
}
