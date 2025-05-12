import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

//This creates a router object that is similar to the app object with its own get and post handlers.
//The use of these seperate router objects is to keep the code clean and modular.
const authRouter = Router();

//We have set to run the signUp function when this API is hit
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;