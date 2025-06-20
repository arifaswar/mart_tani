import { ProductType } from "@/helpers/types";

export default function ProductCard({ product }: { product: ProductType }) {
  console.log(product, "...product");

  return (
    <>
      <div className="p-4 w-auto rounded-lg bg-orange-50 m-4">
        <div className="relative pb-2">
         <img className="w-full h-64 object-cover cursor-pointer rounded-lg" src={product.images} alt={product.name}/>
        <hr className="py-2" />
         <h3 className="text-gray-800 text-lg font-semibold hover:underline">{product.name}</h3>
         <h6 className="">{product.description}</h6>
         <h3>Rp. {product.price}</h3>
        </div>
      </div>
    </>
  );
}
