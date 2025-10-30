const express=require('express');
const mongoose=require("mongoose")
const conncetDB=require("./src/config/db");
const app=express();
const User=require("./src/models/user")
const bcrypt=require("bcryptjs")

app.use(express.json());

app.post("/signUp",async (req,res)=>{
    // console.log(req.body);
    try{
        const {firstName,lastName,email,password}=req.body;
        const hashedPassword=bcrypt.hashSync(password);
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
    const ALLOWED_UPDATES=["firstName","lastName","about","skills"];
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        res.status(400).send("Update is not possible at this field !! ")
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

