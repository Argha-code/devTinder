const express = require("express")

const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth");



requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  // sending a connection request
  const user = req.user
  console.log("Sending a connection Request")

  res.send(user.firstName+" sent the Connection request")

})

module.exports = requestRouter