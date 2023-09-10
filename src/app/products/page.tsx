import CTA from "@/components/cta";
import Feature from "@/components/feature";
import { Product } from "@/components/product";
import { IProduct } from "@/interface";
import axios from "axios";

const ProductsPage = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return (
    <>
      <Feature />
      <section className="flex flex-col space-y-12 container mx-auto">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product: IProduct) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
      <div className="container mx-auto">
        <CTA />
      </div>
    </>
  );
};

export default ProductsPage;
