"use client";
import { useRouter, useParams } from "next/navigation"; // Added useParams
import Link from "next/link"; // Better than router.push for SEO

type CardData = {
  id: string;
  img: string;
  name: string;
  price: number;
};

type CardProps = {
  data: CardData;
};

function Card({ data }: CardProps) {
  const router = useRouter();
  const params = useParams(); // Gets the current 'locale' from the URL
  const locale = params.locale;

  console.log( "PRODUCT NAME FETCHEDD",data.name);
  const handleNavigation = () => {
    // We must include the locale in the URL so it stays in the right language
    router.push(`/${locale}/withNavbar/carddetails/${data.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className="relative cursor-pointer hover:shadow-lg transition-all 
                 flex flex-col border border-gray-200 rounded-xl overflow-hidden
                 w-full sm:w-[300px] bg-white" 
    >
      <img
        className="w-full h-48 object-cover"
        src={data.img}
        alt={data.name || "Product Image"}
      />

      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* If data.name is empty, this will show 'Loading...' so you can troubleshoot */}
          <h3 className="text-lg font-bold text-black">
            {data.name || "Unnamed Product"} 
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Added to cart!");
            }}
            className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>

        <p className="text-gray-600 mt-1">₹{data.price}</p>
      </div>
    </div>
  );
}

export default Card;