const express = require('express')
const authRouter = express.Router();  //like const app = express();
const {validateSignUpData} = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




authRouter.post("/signup",async(req,res)=>{
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

authRouter.post("/login",async(req,res)=>{
  try{
     const {emailId,password} = req.body
     
     const user = await User.findOne({emailId:emailId});
     if(!user){
    throw new Error("Invalid Credential");
     }
  // const  isPasswordValid = await bcrypt.compare(password,user.password) //compare the password with stored password in database
  const  isPasswordValid = await user.validatePassword(password) //compare the password with stored password in database
   


   if(isPasswordValid){
    // create a jwt token 
    //
    // const token = await jwt.sign({_id: user._id}, "DEV@tinder$780",{expiresIn:'0d'})// this methode is absolutly right but we can  use schema methode
    const token = await user.getJWT()
    console.log(token);
    
    //Add the token to the cookie and send the respponseback to the user
    res.cookie("token", token ,{expires:new Date(Date.now() + 8 * 3600000)})
     res.send("Login Successful")
   }
   else{
     throw new Error("Invalid Credential")
   }

  } catch(err){
   res.status(400).send("ERROR: " + err.message);
  }
})       

module.exports = authRouter