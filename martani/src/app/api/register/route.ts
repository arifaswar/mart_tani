import { hashPassword } from '@/helpers/bcrypt';
import UserModel from "@/db/model/UserModel";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password || typeof password !== "string") {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    return new Response(JSON.stringify({ message: "success register" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
}
