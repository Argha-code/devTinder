const express = require("express");  // require express from module

const app = express(); //  after calling express we create a express js application

// app.use("/",(req,res)=>{
//     res.send("Namaste Akshay")
  
// })

app.use("/hello",(req,res)=>{
    res.send("hello hello hello!")
  
})

app.use("/test",(req,res)=>{                   // the function is known as request handeller
    res.send("Hello from the server")          //app.use("/route",(res,res)=>{})
})



app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
});
