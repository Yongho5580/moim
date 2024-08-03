import { getIsOwner, getProduct } from "@/actions/products";
import { onDeleteProduct } from "@/actions/products/[id]";
import ProductCloseButton from "@/components/products/ProductCloseButton";
import ProductModalContainer from "@/components/products/ProductModalContainer";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import {
  ChatBubbleLeftRightIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { useRef } from "react";

export default async function Modal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);

  const handleDeleteProduct = async () => {
    "use server";
    await onDeleteProduct(id);
  };

  return (
    <ProductModalContainer>
      <div className="aspect-square h-full w-full">
        <div className="bg-neutral-900 text-neutral-200 relative flex justify-center rounded-t-xl items-center overflow-hidden h-full">
          <Image
            src={product.photo}
            alt={product.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-contain overflow-hidden"
          />
        </div>
      </div>
      <div className="p-5 flex items-center justify-between border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="size-10 overflow-hidden rounded-full">
            {product.user.avatar !== null ? (
              <Image
                src={product.user.avatar}
                alt={product.user.username}
                width={40}
                height={40}
              />
            ) : (
              <UserIcon className="size-10 rounded-full" />
            )}
          </div>
          <div>
            <h3>{product.user.username}</h3>
          </div>
        </div>
        <div>
          <form action={handleDeleteProduct} className="flex gap-3">
            {isOwner ? (
              <button className="bg-red-500 px-5 py-2.5 rounded-md font-semibold text-white">
                <TrashIcon className="h-[25px]" />
              </button>
            ) : (
              <Link
                className="bg-emerald-500 px-5 py-2.5 rounded-md font-semibold text-white"
                href="/chats"
              >
                <ChatBubbleLeftRightIcon className="h-[25px]" />
              </Link>
            )}
          </form>
        </div>
      </div>
      <div className="h-full flex flex-col p-5 gap-1 overflow-y-auto max-h-[200px] scrollbar-hide">
        <h1 className="text-xl font-medium">{product.title}</h1>
        <span className="text-sm text-neutral-500">{product.location}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(product.created_at.toString())}
        </span>
        <span className="text-lg font-bold">
          {formatToWon(product.price)}원
        </span>
        <p className="mt-4 font-light text-neutral-200 text-sm">
          {product.description}
        </p>
      </div>
    </ProductModalContainer>
  );
}
