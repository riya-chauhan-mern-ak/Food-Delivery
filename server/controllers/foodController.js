import foodModel from "../models/foodModel.js";
import fs from "fs";

//Create food item
const createFoodItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({ success:false, message: "All fields are required" });
        }

        const foodItem = new foodModel({
            name,
            description,
            price,
            image,
            category,
        });

        await foodItem.save();
        res.status(201).json({
            success: true,
            message: "Food item created successfully",
            foodItem,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

//Get all food items
const getFoodItems = async (req, res) => {
    try {
        const foodItems = await foodModel.find({});
        res.status(200).json({
            success: true,
            data:foodItems,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.filename : null;

        const foodItem = await foodModel.findById(id);
        if (!foodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        if (image) {
            // Remove old image if it exists
            if (foodItem.image) {
                fs.unlinkSync(`uploads/${foodItem.image}`);
            }
            foodItem.image = image;
        }

        foodItem.name = name || foodItem.name;
        foodItem.description = description || foodItem.description;
        foodItem.price = price || foodItem.price;
        foodItem.category = category || foodItem.category;

        await foodItem.save();
        res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            foodItem,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}

const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const foodItem = await foodModel.findById(id);
        if (!foodItem) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove image file from server
        if (foodItem.image) {
            fs.unlinkSync(`uploads/${foodItem.image}`);
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}   


export { createFoodItem, getFoodItems, updateFoodItem, deleteFoodItem };