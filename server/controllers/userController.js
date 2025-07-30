import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
const bcrypt = await import('bcryptjs');
import validator from "validator";


const registerUser = async (req, res) => {
    try {
        // Validate request body manually
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //validate email
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter valid email" });
        }

        //validate password
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter valid password" });
        }


        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exist" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User Doesn't exist" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = createToken(user._id);

        res.status(200).json({ success: true, token, message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
}


export { registerUser, loginUser };