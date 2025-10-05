const express = require("express")
const userRouter  = express.Router()
const {userAuth} = require("../middlewares/auth.js") // userAuth extracted from auth.js because its wrapped into in object
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

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



userRouter.get("/feed",userAuth,async(req,res)=>{
      try{
        // User should see all the cards except 
        // 0. his own cards
        // 1. his connections 
        // 2. ignored people
        // 3. already sent the connection request

        const loggedInUser = req.user

// getting my page number from params and convert into a integer and asume that page mu,ber is one
        const page = parseInt(req.query.page)  || 1; 

        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;

        const skip = (page-1)*limit

        // Find all the connections requests (sent + accepted)
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},{toUserId: loggedInUser._id }  // either i have send or received
            ]
        }).select("fromUserId toUserId")

         const hideUsersFromFeed = new Set()
         connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())

         })
        //  console.log(hideUserFromFeed);


         const users = await User.find({
            $and: [
           { _id: { $nin: Array.from(hideUsersFromFeed)}  },
           { _id: { $ne: loggedInUser._id}  }
          
            ],
         }).select(USER_SAFE_DATA).skip(skip).limit(limit)
         

        res.json({data: users})  
      } catch(err){
        res.status(400).json({message: err.message})
      }
})

module.exports = userRouter