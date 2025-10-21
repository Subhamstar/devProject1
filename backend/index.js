const express=require('express');
const app=express();
app.use("/user",(req,res,next)=>{
    console.log("!st response");
    // res.send(" Hello World from 1st !! ");
    next();
},(req,res)=>{
    console.log("2sd response");
    res.send("hello world fron 2nd !! ");
})
app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})