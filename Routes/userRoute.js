
const express=require('express');
const {UserModel,BlacklistModel}=require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



const userRouter=express.Router();

userRouter.post("/register",(req,res)=>{
    try{
        const {username,email,pass,age}=req.body
        bcrypt.hash(pass,5, async(err, hash)=> {
           if(err){
            res.send({"msg":err.message})
           }
           else{
            const user=new UserModel({username,pass:hash,email,age})
            await user.save();
            res.status(200).send({"msg": "Success registration"})
           }
        });
    }
    catch(err){
        console.log(err)
    }
    
  
})

userRouter.post("/login",async(req,res)=>{
    const {email}=req.body
    const user= await UserModel.findOne({email})

    if(user){
        var token = jwt.sign({ userID:user._id }, 'todoapp',{expiresIn:"7d"});
        res.status(200).send({"msg":"Success login",token})
    }
    else{
    res.status(400).send({"msg": "Invalid email or password"})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token= req.headers.authorization
  
const newToken= new BlacklistModel({token})
await newToken.save();
res.status(200).send({"msg":"Success logout"})
})

module.exports ={userRouter}