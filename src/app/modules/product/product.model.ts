import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariants } from "./product.interface";

//  deleartion the type here TVariants

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// declaaration the TInverortyt system 


const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});


//  type declaration the form the server 

const productSchema = new Schema<TProduct>({
  name: {
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
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantsSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

//query middleware:
productSchema.pre("find", function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});


//  schema declaration

productSchema.pre("findOne", function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

export const ProductModel = model<TProduct>("product", productSchema);
