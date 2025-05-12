//We can register the error handler within the express app similarly to the .post() and .get() requests.
//When we throw an error from normal route or middleware. The express searches for an error handler which is identified by having four arguments.
//That error handler is then called and executed.


const errorMiddleware= (err,req,res,next)=>{
    try{
        //This clones the err object to error.
        let error={... err};

        error.message=err.message; //Explcitly setting the message property of the error object to the message property of the err object.
        console.error(err);

        if(err.name=== 'CastError'){
            const message="Resource not found";
            error= new Error(message);
            error.statusCode=404;
        }

        if(err.code === 11000){
            const message= 'Duplicate field value entered';
            error= new Error(message);
            error.statusCode=400;
        }

        if(err.name==='ValidationError'){
            //The mongoose schema validation throws an validation error with err.errors holding the details
            //So we extract each sub-error's message and join them into a comma-seperated string and make a new object with this proeprty
            const message=Object.values(err.errors).map(val=>val.message);
            error= new Error(message.join(','));
            error.statusCode=400;
        }
        res.status(error.statusCode || 500).json({
            success:false,
            error:error.message || 'Internal Server Error'
        });
    }
    catch(error){
        next(error);
    }
}

export default errorMiddleware;