const express = require('express');

const {TodoModel}=require("../model/todoModel")
const {auth}=require("../middleware/auth")
const todoRouter = express.Router();





todoRouter.post("/add",auth,async(req,res)=>{
   
    const todo= new TodoModel(req.body)
await todo.save();
const todos= await TodoModel.find()
res.status(200).send({"msg":"New todo has been added",todos})
})





todoRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params;
    const note=await TodoModel.findOne({_id:noteID})
    try{
        if(req.body.userID!==note.userID){
            res.send({"msg":"You are not authorized"})
        }
 else {   await TodoModel.findByIdAndUpdate(noteID,req.body)
   
        res.send({"msg":`Todo wiht${noteID} has been updated`})}
    }
    catch(err){
        res.send({"erroe":err.message})
    }
})


todoRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
const data= await TodoModel.findOne({_id:id})
    try{
        if(req.body.userID!==data.userID){
            res.send({"msg":"you are not allowed to delete"})
        }
      else{  await TodoModel.findByIdAndDelete(id)
        res.send({"msg":"successfully deleted"})}
    }
    catch(err){
        res.send({"error":err.message})
    }
})

todoRouter.get("/",auth,async(req,res)=>{

    
    try{
       const data= await TodoModel.find({userID:req.body.userID})
       if(data){
        res.send({"msd":"success to get todo data",data})
       }
       else{
        res.send({"error":err.message})
       }
 
    }
    catch(err){
        res.send({"erroe":err.message})
    }
})


module.exports={todoRouter}