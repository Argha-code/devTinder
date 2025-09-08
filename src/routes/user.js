const express = require("express")
const userRouter  = express.Router()
const {userAuth} = require("../middlewares/auth.js") // userAuth extracted from auth.js because its wrapped into in object
const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


// Get all the connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res) => {  // show us the pending request which is not accepted or rejected by the loggedIn user

    try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
     toUserId : loggedInUser._id,
     status:"interested",     
    }).populate("fromUserId","firstName lastName photoUrl age gender about skills")


    res.json({
        message: "Data Feched Successfully",
        data : connectionRequests,
    })
         
    }catch(err){
        res.status(400).send("ERROR" + err.message)
    }
})


// find all the connection who are my connections(like how many people connected with me)
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}

            ]
        })
        .populate("fromUserId",USER_SAFE_DATA )
        .populate("toUserId",USER_SAFE_DATA)
         console.log(connectionRequests)
    const data = connectionRequests.map((row) => {           // give each fromUserId key not gives us extra things
        
        if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
               return row.toUserId
        }
               return row.fromUserId
        
     
    })
    
    res.json({data})
    


} catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})


module.exports = userRouter