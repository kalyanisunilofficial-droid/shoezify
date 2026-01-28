import Hero from "../components/home/hero";
import Card from "../components/product/cards";
import { getTranslations } from 'next-intl/server'; // Use the server version
import { getProducts, getHeromageAndText } from "@/lib/queries"; // Standard import
import { urlFor } from "@/lib/sanity";
import { useTranslations } from "next-intl";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;
  

  const t = await getTranslations({ locale, namespace: 'common' });
 


  const products = await getProducts(locale);
  const heroData = await getHeromageAndText(locale);


 

  const displayData = heroData || {
    title: t('hero'), 
  
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