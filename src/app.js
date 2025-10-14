const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")


app.use(cors({
   origin: "https://devtinder-front.onrender.com",
  

  credentials: true
}))   // this is the middleware to connect with the frontend
app.use(express.json())       // convert into json
app.use(cookieParser()) // to read the cookies from the request



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")
const userRouter = require("./routes/user")

app.use("/",authRouter,profileRouter,requestRouter,userRouter)

connectDB().then(()=>{
    console.log("Database connection  established"); 
    app.listen(7777,()=>{   // my sever is listening on 7777 port
    console.log("Server is successfully listening on port 7777....");   
});   
})
.catch((err)=>{
  console.error("Database cannot be connected")
  
})

 