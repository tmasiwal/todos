
const express=require('express');
const {connection}=require("./db")
const {userRouter}= require("./Routes/userRoute")
const {todoRouter}=require("./Routes/todoRoute")
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",userRouter)
app.use("/todos",todoRouter)






//


app.listen(4500,async()=>{
    try{
        await connection
        console.log("connect to database...");
        console.log("port is running at http://localhost:4500")
    }
    catch(err){
        console.log(err)
    }

})