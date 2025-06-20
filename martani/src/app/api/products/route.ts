import ProductModel from "@/db/model/ProductModel";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().optional(),
  images:z.string()
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validateData = productSchema.parse(body);

    const newProduct = await ProductModel.create(validateData)
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  try {
    const products = await ProductModel.findAll();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch products", {
      status: 500,
    });
  }
}