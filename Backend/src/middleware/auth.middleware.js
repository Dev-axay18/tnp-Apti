import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.utils.js";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.utils.js";



const verifyJWT = asyncHandler( async(req, res, next) => {
   try {
    const token =  req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
 
    
     if(!token){
         throw new apiError("No token provided", 401);
     }
    const decodeToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log("decoded:",decodeToken);
    
    if(!decodeToken){
        throw new apiError("Invalid token", 401);
    }
    const user = await User.findById(decodeToken.id).select("-password");
    if(!user){
        throw new apiError("User not found", 404);
    }
    req.user = decodeToken;
    next();
     
   } catch (error) {
    throw new apiError(401,"Authentication failed", error.message);
   
   }

})

export default verifyJWT;