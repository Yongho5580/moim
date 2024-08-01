import { getIsOwner, getProduct } from "@/actions/products";
import { db } from "@/lib/db";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);

  async function deleteProduct() {
    "use server";
    await db.product.delete({
      where: {
        id,
      },
    });
    redirect("/products");
  }

  return (
    <div>
      <div className="relative aspect-square">
        <Image fill src={product.photo} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
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
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-lg">
          {formatToWon(product.price)}원
        </span>
        <form action={deleteProduct} className="flex gap-3">
          {isOwner ? (
            <button className="bg-red-500 px-5 py-2.5 rounded-md font-semibold text-white">
              삭제
            </button>
          ) : (
            <Link
              className="bg-emerald-500 px-5 py-2.5 rounded-md font-semibold text-white"
              href="/chats"
            >
              채팅하기
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
