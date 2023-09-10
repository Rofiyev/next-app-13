import CustomImage from "@/components/image";
import { IProduct } from "@/interface";
import axios from "axios";
import { notFound } from "next/navigation";

const PageDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const product: IProduct = res.data;

    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-40 pb-10">
        <CustomImage product={product} />

        <div className="divide-2">
          <div className="space-y-2 pb">
            <h1 className="text-2xl md:text-4xl font-bold">{product?.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              {product?.price}$
            </h2>
          </div>

          <div className="pt-4">
            <p className="text-xs md:text-sm">{product?.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default PageDetailPage;
