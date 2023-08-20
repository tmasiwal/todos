
const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    pass:String,
    age:Number
},{versionKey:false})

const UserModel=mongoose.model("users",userSchema)
//blacklist
const blacklistSchema = mongoose.Schema({
    token:String
})
const BlacklistModel = mongoose.model("blacklists",blacklistSchema)

module.exports={UserModel,BlacklistModel}