import {z} from 'zod'
import { database } from '../config/mongodb';
import { UserType } from '@/helpers/types';
import { hashPassword } from '@/helpers/bcrypt';
// const UserSchema = z.object( {
//     username: z
//     .string()
//     .min(3, { message: "Username must be at least 3 characters long" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(5, { message: "Password must be 5 or more characters long" }),
// });
class UserModel {
    static collection() {
        return database.collection<UserType>('users')
    };

    static async create(newUser:UserType) {
        // UserSchema.parse(newUser);

        const existUser = await this.collection().findOne({
            $or: [
                {
                    username: newUser.username
                },
                {
                    email: newUser.email
                }
            ]
        });

        if(existUser){
            throw {
                message: 'Email/username already exist',
                status: 400
            }
        };

        newUser.password = await hashPassword(newUser.password);

        await this.collection().insertOne(newUser);
        return 'Success to Register'
    }
};

export default UserModel