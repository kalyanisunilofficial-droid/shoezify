import Hero from "../components/home/hero";
import Card from "../components/product/cards";

import { getProducts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const {locale} = await params;

  const products = await getProducts(locale);
  const heroData = await (await import('@/lib/queries')).getHeromageAndText(locale);

  return (
    <>
      <Hero herotext={heroData} />

    

      <div className="flex flex-wrap gap-4 justify-center mt-5 m-2">
        {products.map((p: any) => (
          <Card
            key={p._id}
            data={{
              id: p._id,
              name: p.name,
              price: p.price,
              img: urlFor(p.img).width(400).url(),
            }}
          />
        ))}
      </div>
    </>
  );
}
