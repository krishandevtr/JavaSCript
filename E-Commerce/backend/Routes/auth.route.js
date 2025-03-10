import express from "express";
import {login , logout, signup,refreshToken,getProfile} from "../controllers/auth.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh-token",refreshToken);
router.get("/profile",protectRoute,getProfile);


router.all("*",(req,res)=>res.status(404).json({message:"Route not found"}))
export default router;