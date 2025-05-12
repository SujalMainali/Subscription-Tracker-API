import User from "../models/user.model.js";

export const getUsers= async (req,res,next)=>{
    try{
        const users= await User.find();

        res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            data:{
                users
            }
        })
    }
    catch(error){
        //We have a global error handler so we simply pass the error to next handler
        next(error);
    }
}

export const getUserById= async (req,res,next)=>{
    try{
        //We run the authorize middleware before this function which verifies the token and puts the details of user in the req.user field
        const user= await User.findById(req.user.id);

        if(!user){
            const error=new Error("User not found");
            error.status=404;
            throw error;
        }

        res.status(200).json({
            success:true,
            message:`User with ${user._id} fetched successfully`,
            data:{
                user
            }
        })
    }
    catch(error){
        //We have a global error handler so we simply pass the error to next handler
        next(error);
    }
}


