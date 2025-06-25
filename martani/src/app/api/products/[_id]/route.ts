import ProductModel from "@/db/model/ProductModel";
import { ObjectId } from "mongodb";
export async function GET(req: Request, context: { params: { _id: string } }) {
  try {
    const { _id } = context.params;
    console.log(_id);

    if (!ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const product = await ProductModel.findById(_id);

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { _id: string } }
) {
  try {
    const { _id } = context.params;
    if (!ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ message: "Invalid id format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deleted = await ProductModel.deleteById(_id);

    if (deleted.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req: Request, context: { params: { _id: string } }) {
  const { _id } = context.params;

  try {
    if (!ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    const updated = await ProductModel.updateById(_id, body)
    if (!updated) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    };
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
