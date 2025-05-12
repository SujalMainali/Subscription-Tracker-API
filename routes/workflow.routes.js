import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const  workflowRouter = Router();

//We trigger this API from the createSubscription function.
workflowRouter.post("/subscription/remainder", sendReminders);

export default workflowRouter;