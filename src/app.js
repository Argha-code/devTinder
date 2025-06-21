const express = require("express");  // require express from module

const app = express();
const { adminAuth } = require("./middlewares/auth")

//handle Auth middleware for all request  get,post,patch,delete
app.use("/admin",adminAuth)    

app.get("/admin/getAllData",(req,res)=>{   
    res.send("All Data user")
})

app.get("/admin/deleteuser",(req,res)=>{
   res.send("Deleted a user")
})



app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
}); 
