const express=require('express');
const mongoose=require("mongoose")
const conncetDB=require("./src/config/db");
const app=express();
const User=require("./src/models/user")

app.use(express.json());

app.post("/signUp",async (req,res)=>{
    // console.log(req.body);
    try{
        const {firstName,lastName,email,password}=req.body;
        const user=new User({
            firstName,
            lastName,
            email,
            password,
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

