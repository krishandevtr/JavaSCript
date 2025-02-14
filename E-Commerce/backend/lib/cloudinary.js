import {v2 as cloudinary }from "cloudinary";
import dotenv from "dotenv";

cloudinary.config({
    cloud_name :process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

/**
 * !The v2 import gives access to Cloudinary's latest API version, which includes methods for uploading, transforming, and managing media.
 * !
 */