import mongoose from "mongoose";

//THis is basically a schema which is used to define the structure of the data that we are going to store in the database.
//THis is similar to defining a table in SQL database or a class in OOP.
//We can add many instances of this schema to record individual users and save them  to database
const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "Username is required"],
        trim:true,
        minlength:[3, "Username must be at least 3 characters"],
        maxlength:[20, "Username must be at most 20 characters"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Password must be at least 6 characters"],
        select:false,
    },
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;

