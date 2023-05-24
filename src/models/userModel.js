const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //valid email
    profileImage: { type: String, required: true }, // s3 link
    phone: { type: String, required: true, unique: true }, // valid Indian mobile number 
},)

module.exports = mongoose.model('userCollection', userSchema)