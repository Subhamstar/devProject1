const express=require('express');
const mongoose=require("mongoose")
const conncetDB=require("./src/config/db");
const app=express();
const User=require("./src/models/user")
const bcrypt=require("bcryptjs");
const validateSignUpData = require('./src/utils/validator');
const cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken");
const userAuth = require('./src/middleware/auth');
app.use(express.json());
app.use(cookieParser());
// app.post("/signup",async (req,res)=>{
//     console.log(req.body);
//     try{
//         validateSignUpData(req);
//         const {firstName,lastName,email,password}=req.body;
//         const hashedPassword=await bcrypt.hashSync(password,10);
//         const user=new User({
//             firstName,
//             lastName,
//             email,
//             password:hashedPassword,
//         })
//         await user.save();
//         res.send("User Added SuccessFully !! ");    
//     }
//     catch(err){
//         res.status(400).send("Error while SignUp data : "+err.message);
//     }
// })

// app.post("/login",async (req,res)=>{
//     try{
//         const{email,password}=req.body;
//         const user=await User.findOne({email:email});
//         if(!user){
//             res.status(400).send("Invalid Credentials !!");
//         }
//         const isValidpassword=user.validatePassword(password);
//         if(isValidpassword){
//             const token=user.getJWT(); 
//             res.cookie("token",token);
//             res.send("Login Sucessfully !!");
//         }
//         else{
//             res.send("nvalid Credentials !!");
//         }
//     }
//     catch(err){
//         res.status(400).send("Error:"+err.message);
//     }
// })

app.get("/profile", userAuth, async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("Please login again !!");
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
})
app.get("/feed",async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(400).send("User not found")
    }
})

app.delete("/delete",async(req,res)=>{
    try{
        const user=await User.findOneAndDelete({email:req.body.email});
        if(!user){
            res.status(400).send("user not found")
        }
        else {
            res.send("User deleted Successfully !! ");
        }
    }catch(err){
        res.status(400).send("user not found || Already deleted !! ")
    }
})

//update user
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const data=req.body;
    const ALLOWED_UPDATES=["firstName","lastName","about","skills","photoURL"];
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        res.status(400).send("Update is not possible in this field !! ")
    }
    if(!data?.skills.length>10){
        res.status(400).send("skill length must be under 10")
    }
    try{
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("User Updated Successfully !! ")
    }
    catch(err){
        res.status(400).send("Error while updating data "+err.message);
    }

})



conncetDB()
    .then((conn)=>{
        console.log(`Mongo db connect at : ${conn.connection.host} 🚀`);
        app.listen(7777,()=>{
            console.log("Server is running on port 7777 ✅");
        })
    })
    .catch((err)=>{
        console.error(err);
    })

