import express from 'express';
import {
    getAllProducts,
    getFeaturedProducts,
    createProducts,
    destroyProduct,
    getRecommendedProducts,
    getProductsByCategory,
    toggleFeaturedProduct

}
    from '../controllers/product.controller.js';

import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category',getProductsByCategory);
router.get('/recommendations', protectRoute, getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProducts);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);
router.delete('/:id', protectRoute, adminRoute, destroyProduct);




export default router;