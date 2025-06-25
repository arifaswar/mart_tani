import { ProductType } from "@/helpers/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

class ProductModel {
    static collection(){
        return database.collection<ProductType>('products')
    }

    static async create(productData: ProductType){
        return await this.collection().insertOne({
            ...productData,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
    static async findAll(){
        return await this.collection().find().toArray()
    };

    static async findById(id: string) {
        return await this.collection().findOne({_id: new ObjectId(id)})
    };

    static async deleteById(id:string){
        return await this.collection().deleteOne({_id:new ObjectId(id)})
    };

    static async updateById(id:string, updateData:Partial<ProductType>){
        return await this.collection().updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    ...updateData,
                    updatedAt: new Date()
                }
            }
        )
    }
}

export default ProductModel