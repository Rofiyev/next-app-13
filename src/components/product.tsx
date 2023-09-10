"use client";

import { IProduct } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import CustomImage from "./image";

export const Product: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 p-4 rounded-lg flex flex-col group cursor-pointer hover:scale-105 transition-transform ease-out duration-200 border"
    >
      <div className="relative max-h-80 flex-1">
        <CustomImage product={product} fill />
      </div>
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="w-44 truncate">{product.title}</p>
        <p>{`${product.price}$`}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-4">
        {product.description}
      </p>
    </Link>
  );
};
