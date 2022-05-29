const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviews = Schema({
    comment:{
        type:String,
        required: true,
        trim:true,
        unique: true,
    },
    rating:{
        type:String,
        required:true,
    },
    parking_lott:{
        type: Schema.Types.ObjectId, 
        ref:"Parkinglot",
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref:"User",
        required: true,
    }
    
});
const Reviews = mongoose.model("Review", reviews);
module.exports= Reviews
