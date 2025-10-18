const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const  axios = require("axios")





const corsOptions = {
  origin: 'https://devtinder-front.onrender.com', // Your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
   res.send("CORS is working now")
})

console.log("server is runnning");




const pingUrl = "https://devtinder-1-7yhj.onrender.com"; // <--- replace with your backend Render URL
const interval = 30000; // every 5 minutes

function keepAlive() {
  axios
    .get(pingUrl)
    .then(() => console.log("✅ Render backend kept alive"))
    .catch((err) => console.error("⚠ Keep-alive error:", err.message));
}

setInterval(keepAlive, interval);



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

 
