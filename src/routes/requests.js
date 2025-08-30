const express = require("express")

const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")



// so this is the api where i need the data  of fromUserId and toUserId
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

  try{

    const fromUserId = req.user._id   // This is the person who is sending the connection request
    const toUserId = req.params.toUserId
    const status =  req.params.status

    //status validation
    const allowedStatus = ["ignored","interested"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "Invalid status type: " + status})
    }
    
  

    // UserId validation
    const toUser = await User.findById(toUserId)  // a random id is not allowed for this we find our Id
     if(!toUser){
      return res.status(404).json({
        messsage: "User not found"
      })
     }   
     
     
    
    // ConnectionRequest validation

   //IF there is an existing ConnectionRequest
   // I finding in my connectionRequest database -
   const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[         
      {fromUserId,toUserId},   //  - that my fromuserId and toUserId is already exits -
      {fromUserId: toUserId , toUserId: fromUserId} // - or elon and akshay entry is also there
    ],    
   })

     if(existingConnectionRequest){
      return res.status(400).send({message: "Connection request Already exits"})
     }


// we create a instance of the connectionRequest model
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    })
     
  // save the connection data
    const data = await connectionRequest.save()
    res.json({
      message: req.user.firstName + " is " + status + " in " + toUser.firstName,
      data: data   // convert mongoose document to plain object
    })
  }
  catch(err){
   res.status(400).send("ERROR:" + err.message)
  }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,(req,res)=>{

})

module.exports = requestRouter