import Image from "next/image";
import { ProductDetails } from "@/components";
import { getProduct } from "@/lib/products";

interface Props {
  params: {
    id: string;
  };
}

export default async function Product({ params: { id } }: Props) {
  const product = await getProduct(id);

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-12">
      <article className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1 w-full">
          <Image
            className="rounded-lg w-full h-auto"
            src={product.image}
            alt={product.name}
            width={1024}
            height={786}
          />
        </div>
        <div className="flex-1 w-full">
          <ProductDetails product={product} />
        </div>
      </article>
    </section>
  );
}
