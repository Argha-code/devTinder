const express = require("express");  // require express from module

const app = express();

 app.use("/",(req,res,next)=>{
    // res.send("Handeling / route")   // This fn is middlewares
     next();    
 });

 app.get("/user",
    (req,res,next)=>{                  // This fn is middlewares
    console.log("Handeling /user route");  
    next()  
},
    (req,res,next)=>{              // This fn is middlewares
    next()  
},
    (req,res,next)=>{              // This fn is request handeler
    res.send("2nd route handeler")   
},
  
);




app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
});
  