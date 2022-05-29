//const { Double } = require('mongodb');
const validator = require("validator");
const mongoose = require('mongoose');

const parkinglot = new mongoose.Schema({
    parkinglot_name:{
        type:String,
        required: true,
        trim:true,
        unique: true,
    },
    l_name:{
        type:String,
        required: true,
    },
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },
    
    total_space:{
        type:Number,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    security_detail:{
        type:String,
        required:true
    },
    remaining_space:{
        type:Number,
        required:true,
    }
    

})
const Parkinglot = mongoose.model("Parkinglot", parkinglot);;
module.exports = Parkinglot;
