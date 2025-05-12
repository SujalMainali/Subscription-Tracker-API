import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize= async (req, res, next) => {
    try{
        let token;

        //It is the protocol to start the authorization header with Bearer when passing the token to the server
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];  //The string after the space is the actual token
        }

        if(!token){
            res.status(401).json({message:"Unauthorized Access! Token Not Provided"});
        }

        //We should remember that we have decoded the user_ID, server secret and the expiry date on the token so they can be extracted from this token
        const decoded=jwt.verify(token,JWT_SECRET); //This decodes the secret string of the server and the one embedded in the token and the token is verified if they match

        const user=await User.findById(decoded.userID); //We can get the user id by decoding from the token

        if(!user){
            res.status(401).json({message:"Unauthorized access! User Not Listed"});
        }

        req.user=user; //We can use this user in the next middleware or controller function
        next();
    }catch(error){
        //We have a global error handler so we simply pass the error to next handler
        res.status(401).json({message:"Unauthorized access"});
    }
}

export default authorize