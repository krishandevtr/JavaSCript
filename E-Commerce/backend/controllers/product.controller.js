import Product from '../Models/product.model.js';
import redis from '../lib/redis.js';
import cloudinary from '../lib/cloudinary.js';
export const getAllProducts = async(req,res)=>{
    
    try {
        console.log("Hit the getAllProducts")
        const products = await Product.find({});
        console.log([products])
        res.json({products});
    } catch (error) {
        console.log("Error in the getAllProducts controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}


export const getFeaturedProducts = async(req,res,)=>{
    try {
       let featuredProducts =  await redis.get("featured_products")
        if(featuredProducts) return res.json(JSON.parse(featuredProducts));
        // if the stuff is not in the redis we need to fetch from the mongoDb
         featuredProducts =  Product.find({isFeatured:true}).lean();

         if(!featuredProducts) return res.status(401).json({message:"Np featured product found "});

         // if we have the stuff in the mongoDB then we need to add those into the redis as cache for the quick access
        await redis.set("featured_products",JSON.stringify(featuredProducts));
        return res.json({featuredProducts});
    } catch (error) {
        console.log("Error in the getFeaturedProducts");
        return res.status(500).json({message:"Server-error",error:error.message});
    }

}
export const createProducts = async(req,res)=>{
    console.log(req.body)
    console.log("hit the create product route")
    try {
        const {name , description , price,image,category,isFeatured} = req.body;
        console.log("Got the name")
        let cloudinaryResponse = null
        if(image){
            cloudinaryResponse=  await cloudinary.uploader.upload(image,{folder:"products"});
            console.log("Got the response from the cloudinary")
            const product = await Product.create({
                name,
                description,
                price,
                image:cloudinaryResponse?.secure_url ?cloudinaryResponse.secure_url:"",
                category
            })
           
            res.status(201).json({message:"Product Created",product})
        }
    } catch (error) {
        console.log("Error in the createProduct controller");
        return res.status(500).json({message:"Server error",error:error.message});
    }
}

export const destroyProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(401).json({message:"Product is not found "});

        if(product.image){
            const publicId = product.image.split('/').pop().split(".")[0];//This will get the id oof the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("image deleted")

            } catch (error) {
                console.log("error deleting from the cloudinary");
                
                
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted successfully "})
    } catch (error) {
        console.log("Error in deletedProduct controller ");
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        // Aggregation pipeline to select 3 random products
        const products = await Product.aggregate([
            {
                "$sample": { size: 3 } // Corrected without any space before $sample
            },
            {
                "$project": { // Specify fields to include in the result
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1
                }
            }
        ]);
        
        // Sending the products back as a JSON response
        res.json({ products });
    } catch (error) {
        // Handling errors and logging them
        console.log("Error in the getRecommendedProducts", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getProductsByCategory = async (req,res) =>{
    const {category} = req.params;
    console.log(category);
    try {
        const products = await Product.find({category});
        res.json({products});
    } catch (error) {
        console.log("Error in the getProductsByCategory");
        res.status(500).json({message:"Server error ",error:error.message});

        
    }

}

export const toggleFeaturedProduct = async(req,res) =>{
     try {
        const product = await Product.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            //Update the cache
            await updateFeaturedProductsCache();
            return res.json({isFeatured:updatedProduct.isFeatured});
        }
        return res.status(404).json({message:"Not product Found"});
     } catch (error) {
        res.status(404).json({message:"Server error ",error:error.message});
     }
}
async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products",JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in the update cache function ",error.message);
    }
    
}

/**
 * 
 * !featuredProducts =  Product.find({isFeatured:true}).lean();
 * ? When we do this query mongoose gonna return the mongoDb objects (BSON objects);
 * ?when we use the lean(),It gonna return the js objects
 */