import ProductItem from "@/components/products/ProductItem";
import { db } from "@/lib/db";

async function getProducts() {
  const products = db.product.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      price: true,
      photo: true,
      created_at: true,
    },
  });
  return products;
}

export default async function Products() {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
}
