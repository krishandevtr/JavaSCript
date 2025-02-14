import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Configure dotenv to load environment variables from the .env file
dotenv.config();

const generateTokens = async (id) => {
    const accessToken = jwt.sign(
        { id },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: 15 * 60 } 
      );
  const refreshToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET, // Ensure the correct environment variable name
    { expiresIn: 7 * 24 * 60 * 60 } // Set expiration in seconds
  );
  return { accessToken, refreshToken };
};

export default generateTokens;
