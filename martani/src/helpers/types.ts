export type UserType = {
    username: string,
    email:string,
    password:string
}
export type ProductType = {
    name: string,
    description?: string,
    price:number,
    images?: string,
    createdAt?: Date,
    updatedAt?: Date
}