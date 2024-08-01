import { getInitialProducts } from "@/actions/products";
import ProductList from "@/components/products/ProductList";

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
