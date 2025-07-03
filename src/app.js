const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const app = express();
const User = require("./models/user");



app.use(express.json())       // convert into json


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

// GET user by Email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId  // Reading req.body.emailId whatever email i am getting
     try{                               //or find out eamilId from from postman body
          const users = await User.findOne({emailId:userEmail})
          res.send(users)

        // const users = await User.find({emailId:userEmail})   // finding the user from the database
    //     if(users.length===0){
    //       res.status(404).send("User not found")
    //     } else{
    //       res.send(users)
    //     }
        
       }
    catch(err){
      res.status(400).send("Something went wrong") 
    }
   
})

// Feed API - GET /feed - get all the user from the database
app.get("/feed",async(req,res)=>{
   
  try{
     const users = await User.find({})
     res.send(users)

  }   
  catch(err){
      res.status(400).send("Something went wrong") 
    }
   
}) 


//Delete a user from the database
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId
     try{
          // const user = await User.findByIdAndDelete({_id:userId})
        const user = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
     }
    catch(err){
      res.status(400).send("Something went wrong") 
    }
  
})


// Update data of the user 
app.patch("/user",async(req,res)=>{
  const userId = req.body.userId     // find out the userId from postman body
  // console.log(userId); 
  const data = req.body          // then find the data and data is the whole object of postman body
  // console.log(data);
  
  try{
     const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after"})  // and its pass over here nad data is pass over here
     console.log(user);
     
     res.send("user update successfully")
    }
  catch(err){
      res.status(400).send("Something went wrong") 
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

