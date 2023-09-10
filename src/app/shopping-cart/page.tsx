"use client";

import CustomImage from "@/components/image";
import { IProduct } from "@/interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";

const ShoppingCartPage = () => {
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );

  const removeProduct = (id: number) => {
    const updatedCart = products.filter(
      (product: IProduct) => product.id !== id
    );

    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };

  const handleIncrement = (id: number) => {
    const updatedCart = products.map((product: IProduct) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setProducts(updatedCart);
  };

  const handleDecrement = (id: number) => {
    const existProduct = products.find(
      (product: IProduct) => product.id === id
    );

    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedCart = products.map((product: IProduct) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setProducts(updatedCart);
    }
  };

  useEffect(() => {
    const total = products?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {products.length ? (
        <>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products?.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6  shadow-md sm:flex sm:justify-start"
                >
                  <div className="relative w-52">
                    <CustomImage product={product} fill />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {product?.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                        {product?.description}
                      </p>
                      <div className="flex items-center text-sm my-4">
                        <p>{product?.rating?.rate}</p>
                        {product?.rating?.rate && (
                          <div className="flex items-center ml-2 mr-6">
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
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => handleDecrement(product.id)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={product.quantity}
                          min="1"
                        />
                        <span
                          onClick={() => handleIncrement(product.id)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(product?.price * product?.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "usd",
                            }
                          )}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => removeProduct(product.id)}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {total.toLocaleString("en-US", {
                    currency: "usd",
                    style: "currency",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">
                  {(10).toLocaleString("en-US", {
                    currency: "usd",
                    style: "currency",
                  })}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {(total + 10).toLocaleString("en-US", {
                      currency: "usd",
                      style: "currency",
                    }) + " USD"}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-3 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="relative">
              <div className="absolute">
                <div className="">
                  <h1 className="my-2 text-gray-800 font-bold text-2xl">
                    Nothing found!
                  </h1>
                  <p className="my-2 text-gray-800">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                  </p>
                  <Link href={"/"}>
                    <button className="mt-6 rounded-md bg-blue-500 py-3 px-8 font-medium text-blue-50 hover:bg-blue-600">
                      To Home Page
                    </button>
                  </Link>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div>
            <div className="relative w-full">
              <CustomImage
                product={{
                  id: 1,
                  price: 1,
                  description: "",
                  category: "",
                  quantity: 1,
                  rating: { count: 1, rate: 1 },
                  image: "https://i.ibb.co/ck1SGFJ/Group.png",
                  title: "404",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
