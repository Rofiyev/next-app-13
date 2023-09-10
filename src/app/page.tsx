import Hero from "@/components/hero";
import { Product } from "@/components/product";
import { IProduct } from "@/interface";
import axios from "axios";

export default async function Home() {
  const { data } = await axios.get("https://fakestoreapi.com/products");

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-5 xl:px-0 mt-2 mb-5">
      <Hero />
      <section className="flex flex-col space-y-12">
        <h1 className="text-5xl font-bold text-center">
          Rof1yev Shop Deals
        </h1>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {data?.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
