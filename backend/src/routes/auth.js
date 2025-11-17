const express=require('express');
const validateSignUpData = require('../utils/validator');
const authRouter=express.Router();
const user=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userAuth = require('../middleware/auth');


authRouter.post("/signup",async (req,res)=>{
    console.log(req.body);
    try{
        validateSignUpData(req);
        const {firstName,lastName,email,password}=req.body;
        const hashedPassword=await bcrypt.hashSync(password,10);
        const user=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        })
        await user.save();
        res.send("User Added SuccessFully !! ");    
    }
    catch(err){
        res.status(400).send("Error while SignUp data : "+err.message);
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            res.status(400).send("Invalid Credentials !!");
        }
        const isValidpassword=user.validatePassword(password);
        if(isValidpassword){
            const token=user.getJWT(); 
            res.cookie("token",token);
            res.send("Login Sucessfully !!");
        }
        else{
            res.send("nvalid Credentials !!");
        }
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})



module.exports=authRouter;