import express from 'express';
import dotenv from 'dotenv';
const app =express();
dotenv.config();

console.log(process.env.key);
app.get("/health",(req,res)=>{
    res.status(200).json({message:"This is the response from backend"});
})

app.listen(5000,()=>{
    console.log("server running on port 5000");
})