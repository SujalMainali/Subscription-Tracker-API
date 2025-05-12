import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription=async (req,res,next)=>{
    try{

        const subscription= await Subscription.create({
            ... req.body,
            user:req.user._id
        });

        const {workflowRunId} = await workflowClient.trigger({
            //This is the workflow that we are adding to be triggered when subscription is created.
            //This will send a post request to the endpoint specified in the url with the contents of body as payload
            url:`${SERVER_URL}/api/workflows/subscription/remainder`,
            body:{
                subscriptionId:subscription._id,
            },
            headers:{
                'Content-Type':'application/json',
            },
            retries:0,
        })

        res.status(201).json({success:true,data:{subscription,workflowRunId}});
    }catch(error){
        next(error);
    }
}

export const getUserSubscriptions= async(req,res,next)=>{
    try{
        //The authorize middle ware used before this one will have bought the information of the requesting user in req.user
        if(req.user._id.toString()!==req.params.id){   //This is done to make sure that a logged in user can only find information on its own data
            const error=new Error("You are not the owner of this account");
            error.status=401;
            throw error;
        }

        //Now we check through the subscription model and return the subscriptions of the user
        const subscriptions= await Subscription.find({user:req.user._id}).populate("user");
        if(subscriptions.length===0){
            const error=new Error("No subscriptions found");
            error.status=404;
            throw error;
        }
        res.status(200).json({success:true,data:subscriptions});


    }catch(error){
        next(error);
    }
}

export const getSubscriptionById=async (req,res,next)=>{
    try{
        const subscription= req.subscription;
        res.status(200).json({success:true,data:subscription});
        

    }catch(error){
        next(error);
    }
}

export const deleteSubscriptionById=async (req,res,next)=>{
    try{
        const subscription= req.subscription;
        await Subscription.deleteOne({_id:subscription.id}); //We can use the subscription id from the request params as we have already checked if the user is authorized to access this subscription in the subsAuthorize middleware

        res.status(200).json({success:true,message:"Subscription deleted successfully",subscription});
    }catch(error){
        next(error);
    }
}

export const updateSubscriptionById=async (req,res,next)=>{
    try{
        const newSubscription={
            ...req.body,
            user:req.user._id
        }
        const subscription= req.subscription;
        const updatedSubscription= await Subscription.findByIdAndUpdate(subscription._id,newSubscription,{new:true,runValidators:true});
        res.status(200).json({success:true,message:"Subscription updated successfully",data:updatedSubscription}); 
    }
    catch(error){
        next(error);
    }
}

export const deleteUserSubscriptions=async (req,res,next)=>{
    try{
        if(req.user._id.toString()!==req.params.id){
            const error=new Error("You are not the owner of this account");
            error.status=401;
            throw error;
        }   
        await Subscription.deleteMany({ user: req.user._id });

        res.status(200).json({success:true,message:`Subscription cancelled successfully for ${req.user.name} ID: ${req.user._id}`,});
    }catch(error){
        next(error);
    }
}

