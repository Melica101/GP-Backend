const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require('jsonwebtoken');
const user = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    phonenumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if (!validator.isEmail(value))
                console.log("error")
        }
    },
    
    isAdmin: {type: Boolean, default: false}


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