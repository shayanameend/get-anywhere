import { ProductsList } from "@/components";

export default async function Home() {
  return (
    <section className="m-auto max-w-screen-lg px-4 py-12">
      <ProductsList />
    </section>
  );
}
