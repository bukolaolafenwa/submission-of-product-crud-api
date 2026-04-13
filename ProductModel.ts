import { Schema, model } from "mongoose";

export interface IProduct {
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
}


const productSchema = new Schema<IProduct>(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
          type: String,
          required: true,
  },
        price: {
            type: Number,
            required: true,
  },
        imageUrl: {
            type: String,
            required: true,
  },
    },
    {
        timestamps: true,
    }
)

const Product = model<IProduct>("Product", productSchema)

export default Product