import express from "express"
const router = express.Router();
import {protectRoute} from "../middleware/auth.middleware.js"

import {createCheckoutSession,checkoutSuccuss} from "../controllers/payment.controller.js"

router.post("/create-checkout-session",protectRoute,createCheckoutSession);
router.post("/checkout-success",protectRoute,checkoutSuccuss);

export default router;


