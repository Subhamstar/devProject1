const mongoose =require("mongoose");
require('dotenv').config();

const conncetDB=async()=>{
   const conn= await mongoose.connect(process.env.mongoURL);
   return conn;
}
module.exports=conncetDB;