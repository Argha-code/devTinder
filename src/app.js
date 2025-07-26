const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")



app.use(express.json())       // convert into json


app.post("/signup",async(req,res)=>{
  try{
  //validation of data
    validateSignUpData(req)
    const {firstName,lastName,emailId,password} = req.body
  // Encrypt the password
     const passwordHash =  await bcrypt.hash(password,10); 
     console.log(passwordHash);
     
  
     // Creting a new instance of a User model
     const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
     }) 
     
     
    await user.save()        //all of the fn,api will return you a promise so most of the time we can use async await
    res.send("User Added successfully")
     } catch (err){
      res.status(400).send("ERROR : "+ err.message)
     }
    })

app.post("/login",async(req,res)=>{
  try{
     const {emailId,password} = req.body
     
     const user = await User.findOne({emailId:emailId});
     if(!user){
    throw new Error("Invalid Credential");
     }
  const  isPasswordValid = await bcrypt.compare(password,user.password) //compare the password with stored password in database
  
   if(isPasswordValid){
     res.send("Login Successful")
   }
   else{
     throw new Error("Invalid Credential")
   }

  } catch(err){
   res.status(400).send("ERROR: " + err.message);
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
app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId
  // const userId = req.body.userId      
  const data = req.body         //in this if emailId is coming then ignore it because we dont update the emailId
  
 

  try{
     const ALLOWED_UPDATES = [
      // "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills"
    ]
   
      const isUpadteAllowed = Object.keys(data).every((k)=>
             ALLOWED_UPDATES.includes(k) 
      )

      if(!isUpadteAllowed){
        throw new Error("Upadte not Allowed")
      }
      if(data.skills.length>10){
          throw new Error("Skills can not be more than 10")
      }
     const user = await User.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true})  // and its pass over here nad data is pass over here
     console.log(user);
     
     res.send("user update successfully")
    }
  catch(err){
      res.status(400).send("UPDATE FAILED: " + err.message)  
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

 