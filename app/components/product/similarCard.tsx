"use client";
import { useRouter } from "next/navigation";



type CardData = {
  id:string,
  img: string;
  name: string;
  price: number;
};

type CardProps = {
  data: CardData;
};

function SimilarCard({ data }:CardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/withNavbar/carddetails/${data.id}`)

}
      className="relative cursor-pointer hover:shadow-lg transition 
                 flex flex-col shadow-2xs rounded
                 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <img
        className="w-full  h-48 rounded object-cover"
       src={data.img}
        alt={data.name}

      />

      <div className="p-2 md:p-2">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-800"> {data.name}</h3>

       
        </div>

        <p className="text-gray-600">₹{data.price}</p>
      </div>
    </div>
  );
}

export default SimilarCard;
