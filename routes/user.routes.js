import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/userauth.middleware.js";

const userRouter = Router();

//So a get request on the /users URL will be handled by this function
//We must add this router on the /users URL in the app.js file
userRouter.get("/", getUsers);

//THis :id is a dynamic parameter that will be passed in the URL. THis allows the API call for specific users using their ids
userRouter.get("/:id", authorize,getUserById);


export default userRouter;