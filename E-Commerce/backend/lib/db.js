import mongoose from "mongoose";
export const connectDB = async ()=>
{
   try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongo${conn.connection.host}`)
   }catch(error){
    console.log("Error connection to MONGO DB ",error.message);
    process.exit(1)//failure 0 means success
   }
} 