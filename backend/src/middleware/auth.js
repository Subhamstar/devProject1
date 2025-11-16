const jwt=require("jsonwebtoken");
const user=require("../models/userModel");
const userAuth=async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        throw new error("Token not valid !!");
    }
    const decode=await jwt.verify(token,"SincosTani");
    const {_id}=decode;
    const user= user.findById(_id);
    if(!user){
        throw new Error("Plese loggin again !!");
    }
    req.user=user;
    next();
}
module.exports=userAuth;