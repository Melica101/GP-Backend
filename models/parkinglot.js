//const { Double } = require('mongodb');
const validator = require("validator");
const mongoose = require('mongoose');

const parkinglot = new mongoose.Schema({
    parkinglot_name:{
        type:String,
        required: true,
        trim:true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\-]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    l_name:{
        type:String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\-]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    latitude:{
        type:Number,
        required:true,
        unique: true,
    },
    longitude:{
        type:Number,
        required:true,
        unique: true,
    },
    
    total_space:{
        type:Number,
        required: true,
        min:5
    },
    price:{
        type:Number,
        required: true,
    },
    security_detail:{
        type:String,
        required:true
    },
    remaining_space:{
        type:Number,
        required:false,
    }
    

})
const Parkinglot = mongoose.model("Parkinglot", parkinglot);;
module.exports = Parkinglot;
