import Subscription from "../models/subscription.model.js";


export const subsAuthorize = async (req, res, next) => {
    try{
        const subscriptionID=req.params.id;  //The id of the subscription is passed in the url
        const subscription=await Subscription.findById(subscriptionID).populate("user");  //We have referenced the User model in the subscription model this populate method will read from USER model and get the user information
        if(!subscription){
            const error=new Error("Subscription not found");
            error.status=404;
            throw error;
        }
        if(subscription.user._id.toString()!==req.user._id.toString()){
            const error=new Error("Unauthorized access! You are not the owner of this subscription");
            error.status=401;
            throw error;
        }
        req.subscription=subscription; 
        next();
    }catch(error){
        next(error);
    }
}