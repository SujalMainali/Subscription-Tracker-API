import express from 'express';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.route.js';
import workflowRouter from './routes/workflow.routes.js';

import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';



const app=express(); //THis creates an object of express class which is a framework consisting of
                     //all the tools that we need to setup various routes and other functionality of the server.

app.use(express.json()); //This is a middleware that parses incoming requests with JSON payloads and is based on body-parser.
                         //when a request is made with a JSON body, this middleware will parse the JSON and convert it to a JavaScript object

app.use(express.urlencoded({extended:false})); //This is a middleware that parses incoming requests with urlencoded payloads from HTML forms and is based on body-parser.
                                               //It converts the form data sent request into a javascript object
                                               
app.use(cookieParser()); //This is a middleware that parses incoming requests with cookies and populates req.cookies with an object keyed by the cookie names.

app.use(arcjetMiddleware);

app.use('/api/auths',authRouter); //This tells the app to use the authRouter for any request that starts with /api/v1/auth      
app.use('/api/users',userRouter); //This tells the app to use the userRouter for any request that starts with /api/v1/users
app.use('/api/subscriptions',subscriptionRouter); //This tells the app to use the subscriptionRouter for any request that starts with /api/v1/subscriptions
app.use('/api/workflows',workflowRouter);

app.use(errorMiddleware);


//THis app.get is used to create a handler to respond when a get request of same URL is received
app.get('/',(req,res)=>{
    res.send('<h1 style="color:red">Welcome to subscription tracker API</h1>');
});

//This is to tell the server to listen for request on the localhost/3000 port
app.listen(PORT, async ()=>{
    console.log(`Server Running on localhost:${PORT}`);
    await connectToDatabase();
})



export default app 