const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId, // This the type of the sender id
        required: true,
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId, // This the type of the Reciever id    
        required: true,

    },
    status:{
        type: String,
        required: true,

        enum: {     // enum is also an object
             values: ["ignored","interested","accepted","rejected"], // Apart from everything else throw an error
             message:`{VALUE} is incorrect status type`
        }
    }

},{
   timestamps: true
})


//
connectionRequestSchema.index({fromUserId: 1,toUserId:1})

//it is like a middleware it is called every time the connection requst will save
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this
       //UserId validation(its check that Akshay is not sent the friend request to Akshay)
     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){  // it not a string it is a object so we ccheking method is different
        throw new Error("Cannot sent connection request to Yourself")
     }
     next()
})


// model always starts with a capital letter
const ConnectionRequestModel =  new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports = ConnectionRequestModel