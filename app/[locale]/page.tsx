import Hero from "../components/home/hero";
import Card from "../components/product/cards";
import { getTranslations } from 'next-intl/server'; // Use the server version
import { getProducts, getHeromageAndText } from "@/lib/queries"; // Standard import
import { urlFor } from "@/lib/sanity";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;
  
  // 1. Get translations for Server Components
  const t = await getTranslations({ locale, namespace: 'common' });
 

  // 2. Fetch data
  const products = await getProducts(locale);
  const heroData = await getHeromageAndText(locale);
  // const heroData = null; // For testing fallback


  const displayData = heroData || {
    title: t('hero'), 
    // Add an image fallback if your Hero component requires one
    image: "/images/hero2.jpg"
  
  };

  return (
    <>
      <Hero herotext={displayData} />

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