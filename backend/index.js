const express=require('express');
const mongoose=require("mongoose")
const conncetDB=require("./src/config/db");
const app=express();
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

