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
    }
    
});
const Reviews = mongoose.model("Review", reviews);
module.exports= Reviews
