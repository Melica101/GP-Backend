const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
//const config = require("../config");
//const jwt = require("jsonwebtoken");
//const md = require("../middleware");
const auth = require('../middleware/auth');
const router = express.Router();
const userCont = require('../controller/usercont')

router.post('/register', userCont.signup);
router.post('/logIn', userCont.logIn);
router.post('/verifyotp' ,userCont.verifyotp)
router.get("/getUsers", userCont.findAllUsers);
router.get("/getUsers/:_id", userCont.findAUserbyId);
router.get("/getUser/:phonenumber", userCont.findAUserbyPhone);
router.put("/updateUser/:_id", userCont.updateUser);
router.delete("/deleteUser/:_id", userCont.deleteUser);
module.exports = router;