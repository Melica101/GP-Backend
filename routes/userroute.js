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
router.get("/getUsers/:phonenumber", userCont.findAUser);
router.put("/updateUser/:phonenumber", userCont.updateUser);
router.delete("/deleteUser/:phonenumber", auth.authenticateToken, userCont.deleteUser);
module.exports = router;