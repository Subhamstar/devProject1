const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxlength:20,
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
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
        minLength:18,
    },
    gender:{
        type:String,
        enum:["male","female","others"],
    },
    skills:{
        type:[String],
    },
    about:{
        type:"String",
        default:"Aspiring software Engineer !!"
    },
    photoURL:{
        type:"String",
        default:"https://sincostani.png"
    }
},{timestamps:true});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"SincosTani",{expiresIn:"7d"});
    return token;   
}

userSchema.method.validatePassword=async function(password){
    const user=this;
    const isValidate=await bcrypt.compare(password,user.password);
    return isValidate;
}
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;