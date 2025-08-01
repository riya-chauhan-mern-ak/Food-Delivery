import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv';
import userModel from "../models/userModel.js";
import Stripe from "stripe";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

//placing user order from client
const placeOrder = async (req, res) => {

    const frontendURL = process.env.FRONTEND_URL;

    try {
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, {
            cartData: {}
        })

        const lineItems = req.body.items.map((i) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: i.name,
                },
                unit_amount: i.price * 100
            },
            quantity: i.quantity,
        }))

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendURL}/verify?success=true&orderId${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?success=false&orderId${newOrder._id}`
        })

        res.status(200).json({
            success: true,
            message: 'Payment completed successfully',
            session_url: session.url
        })

    } catch (error) {
        console.log('eeeeee', error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({
                success: true,
                message: 'Payment completed successfully'
            })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(500).json({
                success: false,
                message: "Payment Failed"
            });
        }
    } catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


//get all user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId })
        res.status(200).json({
            success: true,
            data: orders
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


//all order listing in admin panel
const listAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({
            success:true,
            data:orders
        })
    } catch (error) {
        res.status(400).json({
            success:500,
            message:"Internal server Error"
        })
    }
}

//for updating order status
const updateOrderStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        const order = orderModel.findById(req.body.orderId)
        
        res.status(200).json({
            success:true,
            message:'Status updated successfully',
            status:req.body.status
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export { placeOrder, verifyOrder, userOrders, listAllOrders, updateOrderStatus }
