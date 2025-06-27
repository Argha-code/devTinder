const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({     // creating a mongoose schema
   firstName:{
    type: String
   },
   lastName:{
    type: String
   },
   emailId:{
    type: String
   },
   password:{
    type: String
   },
   age: {
   type: Number
   },
   gender:{
    type: String
   }
})

// Now we create a mongoose model

// const User = mongoose.model("User",userSchema)    // user=> Name of the model & Schema=> userSchema 
// module.exports = User
//OR
module.exports =  mongoose.model("User",userSchema)





