const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require('jsonwebtoken');
const otp = new Schema({
    
    phonenumber:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{ type: Date, default: Date.now, index : {expires: 300}},

})
const Otp = mongoose.model("Otp", otp)
module.exports= Otp;

