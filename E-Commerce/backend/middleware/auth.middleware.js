import jwt from "jsonwebtoken"; 
import User from "../models/user.model.js";
export const protectRoute = async (req,res,next)=>{
 try {
    const accessToken = req.cookies.accessToken;

    if(!accessToken){
        return res.status(401).json({message:"Unauthorized-No access token provided"});

    }
    try {
        const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        console.log("This the id of the user ",decoded.id);
        if(!user) return res.json({message:"User not found"});
        req.user = user;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            throw error;
            return res.json({message:"Unauthorized -Access token expired "});
           
        }
    }

 } catch (error) {
    console.log("Error in the protected route",error.message);
    res.json({message:"Unauthorized -Invalid access token"});
    
 }
}
export const adminRoute =(req,res,next)=>{
    if(req.user && req.user.role === "admin") {
        return next();
    }
    return res.json({message:"Access denied - Admin only"});
}