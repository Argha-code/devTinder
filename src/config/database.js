const mongoose = require('mongoose')

// to connect to the database
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://arghapanda44:CKnYPXEl0BwHnNCd@namastenode.datrmqv.mongodb.net/devtinder")
}

module.exports = connectDB