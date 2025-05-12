import { Router } from "express";
import { createSubscription, getSubscriptionById, getUserSubscriptions, deleteSubscriptionById,deleteUserSubscriptions,updateSubscriptionById } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/userauth.middleware.js";
import { subsAuthorize } from "../middlewares/subsauth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({message:"All Subscriptions here. Allowed only for admin"}); 
});

subscriptionRouter.get("/:id", authorize,subsAuthorize,getSubscriptionById);

subscriptionRouter.post("/", authorize,createSubscription);

subscriptionRouter.put("/:id",authorize,subsAuthorize,updateSubscriptionById);

subscriptionRouter.delete("/:id", authorize,subsAuthorize,deleteSubscriptionById);

subscriptionRouter.get("/users/:id", authorize,getUserSubscriptions); 

subscriptionRouter.delete("/users/:id/", authorize,deleteUserSubscriptions);




export default subscriptionRouter;