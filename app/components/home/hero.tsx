"use client";
import { urlFor } from "@/lib/sanity";
import { useParams, usePathname } from "next/navigation";

function Hero({ herotext }: { herotext: any }) {
  // Use a null check for the URL. 
  // If no image exists, we pass an empty string or a real placeholder URL.
 const pathName = usePathname();
  const params = useParams();

  const imageUrl = herotext?.img 
    ? urlFor(herotext.img).width(1200).url() 
    : null;

  console.log("Hero Text Check:", herotext?.img);

  return (




   <>
    <div className="relative min-h-[85vh] w-full overflow-hidden ">
     
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0  flex items-center justify-center text-white">
          No Image Uploaded in Sanity
        </div>
      )}

      {/* <div className="absolute inset-0 bg-black/40"></div> */} 

      <div className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center text-center px-4 text-white">
        
      </div>
    </div>


<h1 className="text-3xl  text-center md:text-3xl mt-4   mb-4">
          {herotext?.title || "Shoezify"}
        </h1>
   </>
  );
}

export default Hero;