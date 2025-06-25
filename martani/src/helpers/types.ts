import { ObjectId } from 'mongodb';
export type UserType = {
    username: string,
    email:string,
    password:string
}
export type ProductType = {
    _id: ObjectId,
    // id: string,
    name: string,
    description?: string,
    price:number,
    images?: string,
    createdAt?: Date,
    updatedAt?: Date
}