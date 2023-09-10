"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { IProduct } from "@/interface";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/image";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
/*
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
*/

const ProductDetailPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  const onCloseDialog = (): void => {
    setIsOpen((prev) => !prev);
    router.back();
  };

  useEffect(() => {
    async function getData() {
      setLoading((prev) => !prev);
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
        setLoading((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  const handlerClick = () => {
    const products: IProduct[] | [] =
      JSON.parse(localStorage.getItem("carts") as string) || [];

    const isExistProduct = products.find(
      (item: IProduct) => item.id === product?.id
    );

    if (isExistProduct) {
      const updatedData = products.map((item: IProduct) =>
        item.id === product?.id
          ? {
              ...item,
              quantity: item?.quantity + 1,
            }
          : item
      );

      localStorage.setItem("carts", JSON.stringify(updatedData));
    } else {
      const data = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("carts", JSON.stringify(data));
    }

    toast.success("Product added to your bag");
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden={true} />
      <div className="fixed inset-0 overflow-">
        <div className="flex min-h-full items-center justify-center p-">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium">{product?.price}$</p>

                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating?.rate}</p>
                      {product?.rating?.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {/* {Array.from({
                            length: Math.floor(product?.rating?.rate),
                          }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          ))}
                          {Array.from({
                            length: 5 - Math.floor(product?.rating?.rate),
                          }).map((_, i) => (
                            <StarIconOutline
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          ))} */}
                          <ReactStars
                            value={product?.rating?.rate}
                            edit={false}
                            size={24}
                          />
                          <p className="text-blue-600 hover:underline cursor-pointer text-xs ml-5">
                            See all {product?.rating?.count} reviews
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      onClick={handlerClick}
                      className=" bg-blue-600 w-full hover:bg-transparent text-white hover:text-black border-[0.5px] hover:border-[1.7px] hover:border-blue-600 transition duration-200 ease-out py-2 px-5 md:px-8 rounded text-base"
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className=" bg-blue-600 w-full hover:bg-transparent text-white hover:text-black border-[0.5px] hover:border-[1.7px] hover:border-blue-600 transition duration-200 ease-out py-2 px-5 md:px-8 rounded text-base"
                    >
                      View full detail
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
