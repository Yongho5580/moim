import { getInitialProducts } from "@/actions/products";
import ProductList from "@/components/products/ProductList";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-emerald-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-emerald-600"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
