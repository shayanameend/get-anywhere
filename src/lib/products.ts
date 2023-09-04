import { stripe } from "@/lib/stripe";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
}

export async function getProducts(): Promise<ProductType[]> {
  const productsWithOutPrices = (await stripe.products.list()).data;
  const products: ProductType[] = await Promise.all(
    productsWithOutPrices.map(
      async (productWithOutPrice): Promise<ProductType> => {
        const prices = (
          await stripe.prices.list({
            product: productWithOutPrice.id,
          })
        ).data;

        return {
          id: productWithOutPrice.id,
          name: productWithOutPrice.name,
          description: productWithOutPrice.description!,
          image: productWithOutPrice.images[0],
          price: prices[0].unit_amount!,
          currency: prices[0].currency,
        };
      }
    )
  );

  return products;
}

export async function getProduct(id: string): Promise<ProductType> {
  const productWithOutPrice = await stripe.products.retrieve(id);
  const prices = (await stripe.prices.list({ product: id })).data;

  return {
    id: productWithOutPrice.id,
    name: productWithOutPrice.name,
    description: productWithOutPrice.description!,
    image: productWithOutPrice.images[0],
    price: prices[0].unit_amount!,
    currency: prices[0].currency,
  };
}
