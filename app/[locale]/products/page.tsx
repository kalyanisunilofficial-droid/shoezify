import { getProducts } from "@/lib/queries";

export default async function ProductsPage({
  params,
}: {
  params: { locale: string };
}) {
  const products = await getProducts(params.locale);

  return (
    <div>
      {products.map((p: any) => (
        <div key={p._id}>
          <h2>{p.name}</h2>
          <p>{p.desc}</p>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}
