const express = require("express");  // require express from module

const app = express(); //  after calling express we create a express js application


// app.use("/route",rH1, [rH3,rH4] ,rH5)

app.use("/user",
    [(req,res,next)=>{  // we can send it in array form
    console.log("Handelling the route user 1!!");
    next();       // next function will call
    // res.send("response")  
  
}, 

(req,res,next)=>{
    console.log("Handelling the route use 2!!");
    // res.send("2nd response")
    next();

},],

(req,res,next)=>{
    console.log("Handelling the route use 3!!");
    // res.send("3nd response")
    next();

},    

(req,res,next)=>{
    console.log("Handelling the route use 4!!");
    // res.send("4nd response")
    // next(); 
},    
)

 









// // This will only handle GET call to server
// app.get("/user/:userId",(req,res)=>{
//     console.log(req.query); // user id which declared in url
//     console.log(req.params);  // user id getting from this code
    
//     res.send({firstName:"Argha",lastName:"Panda"})
// })



// app.post("/user",(req,res)=>{
//     // SAVING DATA to DB
//     res.send("Data succesfully saved to the database!")
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted Successfully")
// })

// app.use("/user",(req,res)=>{
//     res.send("Hello From serverrrrr")
// })

// //This will match all the HTTP methode API to /test
// app.use("/test",(req,res)=>{                   // the function is known as request handeller
//     res.send("Hello from the server")          //app.use("/route",(res,res)=>{})
// })



app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
});
