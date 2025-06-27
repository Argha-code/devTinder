const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const app = express();
const User = require("./models/user")


app.use(express.json())


app.post("/signup",async(req,res)=>{
      
     // Creting a new instance of a User model
     const user = new User(req.body) 
     

     try{
    await user.save()        //all of the fn,api will return you a promis so most of the time we can use async await
    res.send("User Added successfully")
     } catch (err){
      res.status(400).send("Error saving tje user"+ err.message)
     }
    })



connectDB().then(()=>{
    console.log("Database connection  established"); 
    app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");   
});   
})
.catch((err)=>{
  console.error("Database cannot be connected")
  
})

