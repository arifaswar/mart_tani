'use client'
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/helpers/types"
import { useEffect, useState } from "react"

export default function Products(){
    const [products, setProducts] = useState<ProductType[]>([]);
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);

                if(!res.ok){
                    throw new Error ("failed to fetch products");
                }
                const response: ProductType[] = await res.json();
                setProducts(response);
                // console.log(response, '>>>response');
                
            } catch (error) {
                console.log(error);
                
            }
        }
        useEffect(() => {
            fetchProducts()
        }, [])
    console.log(products, '>>>products');
    
    return (
        <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 bg-emerald-200">
            {products.map((product, i) => (
                <ProductCard key={i} product={product}/>
            ))}
        </div>
        </>
    )
}