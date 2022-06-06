const mongoose = require("mongoose");
const Schema = mongoose.Schema
const validator = require("validator")
const jwt = require('jsonwebtoken');
const user = new Schema({
    Fname: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\-]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    Lname: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\-]+$/i.test(v);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    phonenumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[+]\d{12}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
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
module.exports = User