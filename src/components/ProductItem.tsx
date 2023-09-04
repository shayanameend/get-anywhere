import Image from "next/image";
import { formatPriceUSD } from "@/lib/prices";
import { ProductType } from "@/lib/products";

interface Props {
  product: ProductType;
}

export default function ProductItem({ product }: Props) {
  return (
    <article>
      <div>
        <Image
          className="h-72 w-full object-cover rounded-lg"
          src={product.image}
          alt={product.name}
          height={288}
          width={320}
        />
      </div>
      <div className="p-2">
        <h2>{product.name}</h2>
        <p className="text-indigo-700">{formatPriceUSD(product.price)}</p>
      </div>
    </article>
  );
}
