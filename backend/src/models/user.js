const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:"Please enter a valid email id ",
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:validator.isStrongPassword,
            message:"Please provide a strong password",
        }
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    skills:{
        type:[String],
    }
},{timestamps:true})
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;