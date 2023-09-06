import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/next-auth";
import { SignOutButton } from "@/components";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { formatPriceUSD } from "@/lib/prices";
import Image from "next/image";

export default async function Dashboard() {
  const { user } =
    ((await getServerSession(authOptions)) as { user: User }) || {};
  if (!user) {
    redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
  });

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-12 flex flex-col md:flex-row gap-4 md:gap-24">
      <div>
        {user && (
          <>
            <h2 className="mb-1 text-3xl font-medium">{user.name}</h2>
            <p className="text-xs mb-3">{user.email}</p>
            <SignOutButton />
          </>
        )}
      </div>
      <div className="flex-1">
        <h2 className="font-bold text-3xl text-violet-700">Purchase History</h2>
        <ul className="flex flex-col gap-8 py-8">
          {orders.map((order) => {
            return (
              <li key={order.id}>
                <article className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div>
                    <h3 className="text-gray-700 mb-4">
                      Order ID:{" "}
                      <span className="uppercase text-xl font-medium">
                        {order.id}
                      </span>
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {order.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <article className="flex gap-4">
                              <div>
                                <Image
                                  className="rounded-lg w-32 h-24"
                                  src={item.image}
                                  alt={item.name}
                                  width={128}
                                  height={96}
                                />
                              </div>
                              <div>
                                <h4 className="mb-0.5">{item.name}</h4>
                                <p className="text-gray-700 text-sm">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-gray-700 text-sm">
                                  Price:{" "}
                                  <span className="text-violet-700">
                                    {formatPriceUSD(item.price)}
                                  </span>
                                </p>
                              </div>
                            </article>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Status:{" "}
                      <span
                        className={`uppercase font-semibold text-sm ${
                          order.status === "pending"
                            ? "text-orange-700"
                            : order.status === "complete"
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Time:{" "}
                      <span className="text-sm">
                        {order.createdAt.toDateString()}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Total:{" "}
                      <span className="text-violet-700">
                        {formatPriceUSD(order.price)}
                      </span>
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
