import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "Subscription name is required"],
        trim:true,
        minlength:[3, "Subscription name must be at least 3 characters"],
        maxlength:[20, "Subscription name must be at most 20 characters"],
    },
    price:{
        type:Number,
        required:[true, "Subscription price is required"],
        min:[0, "Subscription price must be at least 0"],
    },
    currency:{
        type:String,
        required:[true, "Subscription currency is required"],
        enum:["USD", "EUR", "GBP", "INR","NPR"],
        default:"USD",
    },
    frequency:{
        type:String,
        required:[true, "Subscription frequency is required"],
        enum:["daily", "weekly", "monthly", "yearly"],
        default:"monthly",
    },
    category:{
        type:String,
        required:[true, "Subscription category is required"],
        enum:["entertainment", "food", "utilities", "transportation", "health", "other"],
        default:"other",
    },
    payment:{
        type:String,
        required:[true, "Subscription payment method is required"],
        trim:true,
    },
    status:{
        type:String,
        required:[true, "Subscription status is required"],
        enum:["active", "inactive", "cancelled"],
        default:"active",
    },
    startDate:{
        type:Date,
        required:[true, "Subscription start date is required"],
        default:Date.now,
        validate:{
            validator:function(value){
                return value <= Date.now();
            },
            message:"Start date must be in the past or present",
        },
    },
    renewalDate:{
        type:Date,
        //For this validator if the condition is met the function is returned so the validation passes and the entry is added to the database
        validate:{
            validator:function(value){
                return value >= this.startDate;
            },
            message:"Renewal date must be after start date",
        },
    },
    //This is a field in the subscription schema that is used to store the details of user recording the subscription
    //We have specified the type to be an object previously which is a previously created schema
    //The index field tells the mongoose to keep this user field as the index of the entry in database so, it can be searched efficiently.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "User is required"],
        index:true,
    }
},{timestamps:true});

//This function is called before saving the new entry into the database.
//This is used to set the renewal date of the subscription based on the frequency and start date, if the renewal date is not specified by the user.
subscriptionSchema.pre("save", function(next){
    const renewalPeriods={
        daily:1,
        weekly:7,
        monthly:30,
        yearly:365,
    };
    if(!this.renewalDate){
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    if(this.renewalDate<new Date()){
        this.status="Expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
