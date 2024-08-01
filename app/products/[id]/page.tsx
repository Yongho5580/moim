async function getProduct() {
  return new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function Hello({
  params: { id },
}: {
  params: { id: string };
}) {
  const products = await getProduct();
  return <div>Hello! {id}</div>;
}
