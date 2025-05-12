import aj from "../config/arcjet.js";

//This middleware is toward the beginning of the middleware stack. The incoming requests are first passed to this middleware and allowed to pass after some checks
const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision= await aj.protect(req,{requested:1});  //This is the function that checks the incoming request and decides whether to allow it or not
                                                              //The reqested parameter is the no. of tokens that are removed from the bucket per request        
        if(decision.isAllowed){ 
            next();
        }
        else{
            if(decision.reason.isRateLimit()) return res.status(429).json({message:"Rate limit exceeded"});
            if(decision.reason.isBot()) return res.status(403).json({message:"Bot detected"});
            return res.status(403).json({message:"Request blocked"});
        }
    }
    catch(err){
        console.error("Arcjet middleware error:", err);
        next(err);
    }
}

export default arcjetMiddleware;