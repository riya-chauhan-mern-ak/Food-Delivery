import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

//app config
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//database connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

//api routes
app.get("/", (req, res) => {
  res.send("Welcome to the Food Delivery Server!");
});

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

