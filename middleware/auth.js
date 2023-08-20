var jwt = require('jsonwebtoken');
const auth =(req,res,next)=>{

const token= req.headers.authorization


var decoded = jwt.verify(token, 'todoapp');
if(decoded){req.body.userID=decoded.userID;
   
next()}


else{
    res.status(400).send({"msg":"login again"})
   }

   }



   module.exports ={auth}