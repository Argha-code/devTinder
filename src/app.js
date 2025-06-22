const express = require("express");  // require express from module

const app = express();
const { adminAuth,userAuth } = require("./middlewares/auth")

//handle Auth middleware for all request  get,post,patch,delete
app.use("/admin",adminAuth) 
// app.use("/user",userAuth)

app.post("/user/login",(req,res)=>{
    res.send("Logged in successfully")
})


app.get("/admin/getAllData",(req,res)=>{   
    res.send("All Data user")
})


app.get("/user",userAuth,(req,res)=>{
    res.send("User Data send")
})

app.get("/admin/deleteuser",(req,res)=>{
   res.send("Deleted a user")
})



app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
}); 
