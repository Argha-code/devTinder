const mongoose = require('mongoose')


const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://arghapanda44:CKnYPXEl0BwHnNCd@namastenode.datrmqv.mongodb.net/devtinder"
// to connect to the database
const connectDB = async()=>{
    await mongoose.connect(MONGO_URL)
}

module.exports = connectDB