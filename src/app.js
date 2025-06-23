const express = require("express");  // require express from module

const app = express();



app.get("/getUserData",(req,res)=>{
    try{
        //logic of db call and get user data

    throw new Error("erfvneo")
    res.send("User Data send")
    }
    catch(err){
         res.status(500).send("Some error contact support team")
    }
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})


app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
}); 
