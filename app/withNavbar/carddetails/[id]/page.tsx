
import SimilarCard  from "../../../components/product/similarCard";

import { products, type Product } from "../../../data/products" ;
export default async  function CardDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


 const {id} = await params;
  const product = products.find( p => String(p.id) === id);
  return (
    <div className="m-6">

    <div className="flex flex-col md:flex-row gap-6 ">
      
      <div className="md:w-1/2">
        <img
         src={product?.img}
          className="w-full h-100 object-cover rounded-lg "
        />
      </div>

     <div className="md:w-1/2 flex flex-col justify-between">
  <div>
    <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
    <p className="text-gray-600">{product?.desc}</p>
    <p className="text-gray-600 mb-4">
   Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid blanditiis molestias ea maiores fuga laborum accusantium harum nihil natus sunt! Animi, doloremque suscipit. Quas aliquam, culpa accusamus ex numquam eos!
    </p>
    <p className="text-xl font-semibold mb-4">₹{product?.price}</p>
    <p className="text-red-500 mb-2">Limited Time Offer!</p>
    <button className="bg-yellow-300 text-dark px-6 py-2 rounded">
      Add to Cart
    </button>
  </div>

 
 
</div>


      {/*  gives out a third column <p className=""> This is space for other similar products</p> */}
      
    </div>

    <div className="mt-10 ">
  <p className="mb-2 font-semibold text-xl  text-center">Similar products</p>
  <div className="flex flex-wrap gap-6 justify-center">
    {products.map((product: Product) => (
      <SimilarCard key={product.id} data={product} />
    ))}
  </div>
</div>

    </div>
  );
}
