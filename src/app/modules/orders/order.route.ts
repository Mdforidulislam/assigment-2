import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Define the all the rouing system
router.post("/order", orderController.createOrder);
router.get("/getorders", orderController.getAllOrders);
router.get("/getsingleorder", orderController.getSingleOrder);

export const OrderRoutes = router;
