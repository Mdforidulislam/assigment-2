import { Request, Response } from "express";
import { orderServices } from "./order.service";
import OrderZodSchema from "./order.validation";

// make single order form  customer 
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = OrderZodSchema.parse(req.body);
    const result = await orderServices.createOrderIntoDB(orderData);
    res.status(201).json({
      success: true,
      message: "Order is created successfully",
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

// Get all the order form the database 
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromBD();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
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

// Get single order by emial  from the server 
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await orderServices.getSignleOrderFromBD(email);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully!",
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

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
