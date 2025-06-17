const express = require("express");  // require express from module

const app = express();

app.use("/user",
[(req,res,next)=>{
    // Route Handeler1
    console.log("Handeling the route user 1");
    //  res.send("Response! 1");
    next();
},
(req,res,next)=>{
    // Route Handeler2
    console.log("Handeling the route user 2");
    // res.send("Response! 2"); 
    next();
}],
(req,res,next)=>{ 
    console.log("Handeling the route user 3");
    // res.send("Response! 3");   
    next();
},
(req,res,next)=>{ 
    console.log("Handeling the route user 4");
     res.send("Response! 4");
    // next();   
}
);


app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
});
