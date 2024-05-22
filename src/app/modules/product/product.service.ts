import { Types } from "mongoose";
import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// Create a single product
const createProductIntoDB = async (product: TProduct): Promise<TProduct> => {
  try {
    const result = await ProductModel.create(product);
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
};

// Retrieve a list of all products
const getAllProductsFromDB = async (): Promise<TProduct[]> => {
  try {
    const result = await ProductModel.find({ isDelete: false });
    return result;
  } catch (error) {
    console.error("Error retrieving all products:", error);
    throw new Error("Error retrieving all products");
  }
};

// Retrieve a single product by ID
const getSingleProductFromDB = async (id: string): Promise<TProduct | null> => {
  try {
    const result = await ProductModel.findOne({ _id: id, isDelete: false });
    return result;
  } catch (error) {
    console.error(`Error retrieving product with ID ${id}:`, error);
    throw new Error("Error retrieving product");
  }
};

// Update a single product by ID
const updateSingleProductFromDB = async (
  id: string,
  updatedProduct: Partial<TProduct>
): Promise<TProduct | null> => {
  try {
    const result = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updatedProduct },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error("Error updating product");
  }
};

// Soft delete a product by ID
const deleteProductFromDB = async (id: string): Promise<boolean> => {
  try {
    const objectId = new Types.ObjectId(id);
    await ProductModel.updateOne(
      { _id: objectId },
      { $set: { isDelete: true } }
    );
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error("Error deleting product");
  }
};

// Search products by name
const searchProducts = async (searchTerm: string): Promise<TProduct[]> => {
  try {
    const products = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isDelete: false,
    });
    return products;
  } catch (error) {
    console.error(`Error searching products with term "${searchTerm}":`, error);
    throw new Error("Error searching products");
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteProductFromDB,
  searchProducts,
};
