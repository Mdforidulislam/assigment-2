import { Schema, model } from "mongoose";
import { TOrders } from "./order.interface";


// delare schema modules for product 

const OrderSchema = new Schema<TOrders>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true, ref: "Product" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true, 
  },
);

export const OrderModel = model<TOrders>("order", OrderSchema);
