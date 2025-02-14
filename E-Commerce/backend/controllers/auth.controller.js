import User from '../models/user.model.js';
import jwt from "jsonwebtoken"
import redis from '../lib/redis.js'; // Default import
import generateTokens from '../utils/token.util.js';
import {setCookie} from "../utils/cookie.util.js";
const storeRefreshToken = async (userId, refreshToken) => {
 await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
}
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(`${email},${password}, ${name}`)
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    //Authenticate
    const{accessToken,refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id,refreshToken);
    setCookie(res,accessToken,refreshToken);
    res.status(201).json({ user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    },message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error in the signup controller ',error.message);
  }
};

export const login = async (req, res) => {

  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    console.log("Got the user",user);
    if(user &&(await user.comparePassword(password))){
       const {accessToken,refreshToken} = generateTokens(user._id);
       await storeRefreshToken(user._id,refreshToken);
      setCookie(res,accessToken,refreshToken);
      res.json({
        user
      });
    }else{
      res.status(401).json({message:"Invalid credentials"});
  }
  } catch (error) {
    console.log('Error in the login controller ',error.message);
    res.status(500).json({message:"Server error ",error:error.message}); 
  }
};

export const logout = async (req, res) => {
  try {
    console.log("Checking the refresh token");
    const refreshToken = req.cookies?.refreshToken; // Read from cookies
    console.log(refreshToken);

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.id}`);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.json({ message: "Logged out" });
    } else {
      res.json({ message: "No refresh token found" });
    }
  } catch (error) {
    console.log("Error in the logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//This will refresh the access token
export const refreshToken = async(req,res)=>{
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({message:"No refresh token"})
    }
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token${decoded.userId}`);
    if(storedToken!== refreshToken){
      res.status(401).json('invalid refresh Token');
    }
    const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});

    res.cookie("accessToken",accessToken,{
      httpOnly:true,// Prevent the XSS attack
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",// Prevent CSRF attacks,cross-site request forgery
      maxAge:15*60*1000 // 15min 
    });
    res.json({message:`access Token refreshed`});
  } catch (error) {
    res.status(500).json({message:"Server error ",error:error.message}); 
  }
}

export const getProfile = (req,res)=>{
  try {
    const user = req.user;
    res.json({user:user});
  } catch (error) {
    res.status(500).json({message:"Server error ",error:error.message}); 
  }
}

