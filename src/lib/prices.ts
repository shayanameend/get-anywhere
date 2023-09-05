import { CartItemType } from "@/lib/store";

export function calculateTotalPrice(items: CartItemType[]) {
  return items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);
}

export function formatPriceUSD(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}
