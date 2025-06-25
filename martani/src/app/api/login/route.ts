import UserModel from "@/db/model/UserModel";
import { comparePassword, hashPassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";
import { string, z } from "zod";

// const loginSchema = z.object({
//     email: z.string().email({message: 'Invalid Email format'}),
//     password: z.string().min(1, {message: "Password is required"})
// })
export async function POST(request: Request){
    try {
    const body = await request.json();

    const {email, password} = ({
      ...body,
      password: hashPassword(body.password)
    });
    // const {email, password} = body

    console.log(email, password);
    

    const user = await UserModel.collection().findOne({email});
    console.log(user, '>>> login api');
    
    // if(!user) {
    //     return Response.json(
    //     { message: "Invalid email/password" },
    //     { status: 401 }
    //   );
    // };

    if (!user) {
        return Response.json(
            { message: "Invalid email/password" },
            { status: 401 }
        );
    }

    const isValidPassword = comparePassword(password, user.password);
    console.log(isValidPassword);
    

    if(!isValidPassword){
        return Response.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    };

    const access_token = signToken({_id: user._id.toString(), email: user.email});

    (await cookies()).set('authorization', `Bearer ${access_token}`);

    return Response.json({
            message: 'Success login',
            access_token: access_token
    })
    }catch (error:any) {
        console.log(error);
        return Response.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
    }
}