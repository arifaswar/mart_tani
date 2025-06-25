import ProductModel from "@/db/model/ProductModel";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validateData = (body);

    const newProduct = await ProductModel.create(validateData)
    return Response.json(newProduct, {status: 201})
  } catch (error:any) {
    console.log(error);
    return Response.json({message: error.message}, {status: 400})
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