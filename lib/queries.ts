import { sanityClient } from "./sanity";


export async function getProducts(lang: string) {
  // This query says: Try to get the name in the requested [lang]. 
  // If that's null, try 'en_IN'. If that's null, use the first translation found.
  const query = `*[_type == "product"]{
    _id,
    price,
    img,
    "name": coalesce(
      translations[$lang].name, 
      translations["en_IN"].name, 
      "Unnamed Product"
    ),
    "desc": coalesce(
      translations[$lang].desc, 
      translations["en_IN"].desc, 
      ""
    )
  }`;

  return await sanityClient.fetch(query, { lang });
}

// Fetch navigation labels based on the  language
export async function getSiteSettings(lang: string) {
  // We use [0] to get the first (and only) settings document
  const query = `*[_type == "siteSettings"][0]{
    "navbar": coalesce(navbar[$lang], navbar["en_IN"]),
    "footer": coalesce(footer[$lang], footer["en_IN"])
  }`;
  
  const data = await sanityClient.fetch(query, { lang });
  
  // Log this to your terminal to see what is actually coming back
  console.log(`FETCHING SETTINGS FOR: ${lang}`, data); 
  
  return data;
}

export async function getHeromageAndText(lang: string) {
  const query = `*[_type == "hero"][0]{ 
    // This reaches into heroContent.en_IN or heroContent.ml 
    // and flattens 'title' and 'img' to the top level
    ...coalesce(heroContent[$lang], heroContent["en_IN"])
  }`;
  
  const data = await sanityClient.fetch(query, { lang });
  return data;
}