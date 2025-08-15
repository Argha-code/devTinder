const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({     // creating a mongoose schema
   firstName:{
    type: String,
    required:true,   // it is mendatory to give the firstname otherwise it will throw a error
    minLength:4,
    maxLength:50,
   },
   lastName:{
    type: String
   },
   emailId:{
    type: String,
    lowercase: true,
    required:true, 
    unique: true,
    trim:true,       // space trim
    validate(value){
       if(!validator.isEmail(value)){
         throw new Error("Invalid email address "+ value)
       }    
    }
   },
   password:{
    type: String,
    required:true,
      validate(value){
       if(!validator.isStrongPassword(value)){
         throw new Error("Enter a strong Password: "+ value)
       }    
    }
   },
   age: {
   type: Number,
   min:18,
   max:50,  
   },
   gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){    //custom validation
         throw new Error("Gender data is not valid")
      }
    }
   },
   photoUrl: {
      type: String,
      default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate(value){
       if(!validator.isURL(value)){
         throw new Error("Invalid photo URL "+ value)
       }    
    }
   },
   about: {
      type: String,
      default: "This is the default about of the user"
   },
   skills: {
      type: [String]
   }
   // createdAt:{     // do that foe when is register or use timestamp
   //    type: Date
   // }
},{
   timestamps:true
}
)

userSchema.methods.getJWT = async function(){
   const user = this
// so this argha,elon all these are the instances of the user model so 
// when i referred to this over here so it will refers that particuler instance
   const token = await jwt.sign({_id: user._id}, "DEV@tinder$780",{expiresIn:'7d'})
   return token;
}
userSchema.methods.validatePassword = async function(passwordInputByuser){
   const user = this
   const passwordHash = user.password;

   const isPasswordValid = await bcrypt.compare(passwordInputByuser,passwordHash)
      return isPasswordValid
}

// Now we create a mongoose model

// const User = mongoose.model("User",userSchema)    // user=> Name of the model & Schema=> userSchema 
// module.exports = User
//OR
module.exports =  mongoose.model("User",userSchema)





