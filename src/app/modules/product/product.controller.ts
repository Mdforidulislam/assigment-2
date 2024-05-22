import { Request, Response } from "express";
import productZodSchema from "./product.validation";
import { productServices } from "./product.service";

// create singl order here 
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const zodParseProduct = productZodSchema.parse(product);
    const result = await productServices.createProductIntoDB(zodParseProduct);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error, 
    });
  }
};


//get all th product hre for show users
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromBD();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      error: error,
    });
  }
};

//get  single order for serachirng by userhs

const getSignleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    console.log(id);
    const result = await productServices.getSignleProductFromBD(id);
    res.status(200).json({
      success: true,
      message: "product retrieve successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      error: error,
    });
  }
};

//update  the sing order by cusomter 
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const id = req.params.productId;
    const zodParseProduct = productZodSchema.parse(product);
    const result = await productServices.updateSignleProductFromBD(
      id,
      zodParseProduct,
    );
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Product is updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error, 
    });
  }
};

//   deleted the product form the database here 

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.deleteProductFromDB(id);
    res.status(200).json({
      success: true,
      message: "product delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something is wrong",
      error: error,
    });
  }
};

//  searhc the data here i need to serach database 

const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const products = await productServices.searchProduct(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error,
    });
  }
};


export const productControllers = {
  createProduct,
  getAllProducts,
  getSignleProduct,
  updateSingleProduct,
  deleteProduct,
  searchProducts,
};
