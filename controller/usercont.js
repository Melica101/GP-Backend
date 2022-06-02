//const express = require("express")
const req = require("express/lib/request");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator')
// const Otp = require("../models/otp");
const axios = require("axios");
const crypto = require("crypto")
const key = process.env.HASH_SECRET_KEY
const auth = require('../middleware/auth');

exports.findAllUsers = (req, res) => {
    User.find({}, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        res.json({
            data: result,
        });
    });
}
exports.signup = (req, res) => {
    console.log("register")
    const user = new User({
        Fname: req.body.Fname,
        Lname:req.body.Lname,
        phonenumber: req.body.phonenumber,
        
    });

    user.save()
        .then(() => {
            console.log("user registered");
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(400).json({ msg: err });
            console.log(err)
        })
}
/*exports.signin = (req, res) => {
    User.findOne({ phonenumber: req.params.phonenumber }, (err, result) => {
        const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
        console.log(OTP);
        const phonenumber = req.params.phonenumber;
        const otp = new Otp({ phonenumber: phonenumber, otp: OTP });
        //const salt = bcrypt.genSalt(10);
        //otp.otp = bcrypt.hash(otp.otp , salt);
        otp.save()
            .then(() => {
                console.log("otp succesful");
                res.status(200).json(otp);
            })
            .catch((err) => {
                res.status(400).json({ msg: err });
                console.log(err)
            })


    });

}*/
function createotp(params, callback) {
    const otp = otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const tt1 = 5 * 60 * 1000;
    const expires = Date.now() + tt1;
    // const data = `${params.phonenumber}.${expires}`;
    const data = `${params.phonenumber}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;

    console.log(`your otp is ${otp}`);
    return callback(null, {otp,fullHash});    
}
function vverifyotp(params, callback) {
    let [hashValue, expires] = params.hash.split('.');
    
    let now = Date.now();
    if (now > parseInt(expires)) return callback("Otp expired");
    let data = `${params.phonenumber}.${params.otp}.${expires}`;
    let newCalulateHash = crypto
        .createHmac("sha256", key)
        .update(data)
        .digest("hex");

    if (newCalulateHash === hashValue) {
        return callback(null, "Success");
    }
    return callback("Invalid Otp")
}
exports.verifyotp = (req, res, next) => {
    const token = auth.generateAccessToken(req.params.phonenumber)
    vverifyotp(req.body, (err, result) => {
        if (err) {
            return res.status(400).send({
                message:err,
            })
        }
        return res.status(200).send({
            message: "Success",
            token: token,
            data: result,
        })
    })


}
exports.logIn = (req, res) => {
    createotp(req.body, (err, result) => {
        if (err) {
            return (err);
        }
        return res.status(200).send({
            message: "success",
            data: result
        })
    })
}

/*exports.findAUser =(req, res) => {
    User.findOne(req.params.phonenumber)
    .then(()=>{
        res.json({
            data:result,
        })
    })
    .catch(err => {
        res.json({
            meesage:"user not found"
        })
    })

}*/
exports.findAUser = (req, res) => {
    User.findOne({ _id: req.params._id },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                // msg: "user ",

                data: result,
            };
            return res.json(msg);
        });
}


// exports.updateUser = (req, res) => {
//     User.findOneAndUpdate({ phonenumber: req.params.phonenumber },
//         (err, result) => {
//             if (err) return res.status(500).json({ msg: err });
//             const msg = {
//                 msg: "user update",
//                 data: result,
//             };
//             return res.json(msg);
//         });
// }
// exports.updateUser = (req, res) => {
//     User.findOneAndUpdate(req.params.phonenumber ,req.body,{new:true,runValidators:true},
//         (err, result) => {
//             if (err) return res.status(500).json({ msg: err });
//             const msg = {
//                 data:result,
//             };
//             return res.json(msg);

//         });
// }
exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params._id }, { $set: { Fname:req.body.Fname, Lname: req.body.Lname, phonenumber: req.body.phonenumber } },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                data:result,
            };
            return res.json(msg);

        });
}
exports.deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params._id },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                msg: "user deleted",
                data: result,
            };
            return res.json(msg);
        });
}
//exports.sendotp =