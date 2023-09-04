import Link from "next/link";
import { ProductItem } from "@/components";
import { getProducts } from "@/lib/products";

export default async function ProductsList() {
  const products = await getProducts();

  return (
    <ul className="grid-cols-fluid grid gap-12">
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <ProductItem product={product} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
