
const mongoose= require('mongoose');

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    important:Boolean,
    status:Boolean,
    due:String,
    userID:String,
    repeat:String

},{versionKey:false})

const TodoModel=mongoose.model("todos",todoSchema)

module.exports={TodoModel}