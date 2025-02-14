import express from "express";
import authRoutes from "./Routes/auth.route.js"
import productRoutes from "./Routes/product.route.js"
import cartRoutes from "./Routes/cart.route.js"
import couponRoutes from "./Routes/coupon.route.js"
import paymentRoutes from "./Routes/payment.route.js"
import analyticsRoutes from "./Routes/analytics.route.js"
const app = express();
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";



dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));  // For JSON payloads
app.use(express.urlencoded({ limit: "50mb", extended: true }));  // For form-data (including file uploads)

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/analytics",analyticsRoutes);

app.listen(PORT,()=>{
    console.log("serving on the port 5000");
    connectDB()
})