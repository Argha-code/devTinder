const express = require("express");  // require express from module

const app = express(); //  after calling express we create a express js application

// This will only handle GET call to server
app.get("/user",(req,res)=>{
    res.send({firstName:"Argha",lastName:"Panda"})
})


app.post("/user",(req,res)=>{
    // SAVING DATA to DB
    res.send("Data succesfully saved to the database!")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully")
})

app.use("/user",(req,res)=>{
    res.send("Hello From serverrrrr")
})

//This will match all the HTTP methode API to /test
app.use("/test",(req,res)=>{                   // the function is known as request handeller
    res.send("Hello from the server")          //app.use("/route",(res,res)=>{})
})



app.listen(7777,()=>{   // my sever is listening on 3000 port
    console.log("Server is successfully listening on port 7777....");
    
});
