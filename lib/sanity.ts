import { createClient } from "@sanity/client";
// 1. Change this line:
import imageUrlBuilder from "@sanity/image-url"; 

// 2. To this:
import createImageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "0bpyjv6o",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// 3. Update the builder initialization:
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}