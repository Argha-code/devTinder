const express = require("express");  // require express from module
const connectDB = require("./config/database")     // require database folder
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://devtinder-front.onrender.com',  // Replace with your frontend URL on render
    'http://localhost:5173',                   // For local development
                        // For local development alternative port
  ],
  credentials: true,                           // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'x-auth-token'], // Allowed headers
  exposedHeaders: ['token'],                   // Expose these headers
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// console.log("server is runnning");
// // ... rest of your backend code




// const corsOptions = {
//   origin: 'https://devtinder-front.onrender.com', // Your frontend URL
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json())
// app.use(cookieParser())

// app.get("/",(req,res)=>{
//    res.send("CORS is working now")
// })

// console.log("server is runnning");




// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))   // this is the middleware to connect with the frontend
// app.use(express.json())       // convert into json
// app.use(cookieParser()) // to read the cookies from the request



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

 
