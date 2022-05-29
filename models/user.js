const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require('jsonwebtoken');
const user = new Schema({
    Fname:{
        type:String,
        required:true,
        trim:true,
    },
    Lname:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true,
    },

})



user.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        phonenumber: this.phonenumber
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token
}

const User = mongoose.model("User", user)
module.exports= User