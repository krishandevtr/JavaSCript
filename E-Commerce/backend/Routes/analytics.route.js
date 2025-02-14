import express from "express"
import { getAnalyticsData ,getDailySalesData} from "../controllers/analytics.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get('/',protectRoute,adminRoute,async(req,res)=>{
   try {
    const analyticsData = await getAnalyticsData(req,res);
    const endDate = new Date();
    const startData =  new Date(endDate.getTime()-7*24*60*60*1000);
    const dailyAnalysis = await getDailySalesData(startData,endDate,res);
    res.json({
        analyticsData,
        dailyAnalysis
    })
   } catch (error) {
    console.log("Error in analytics route ",error.message);
    res.status(500).json({
        message:"Server Error",error:error.message
    })
    
   }
});



export default router;