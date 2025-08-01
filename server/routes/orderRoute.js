import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listAllOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userOrder',authMiddleware,userOrders);
orderRouter.get('/listall',listAllOrders);
orderRouter.post('/status',updateOrderStatus);

export default orderRouter