const express = require("express");
//const Location = require("../models/location");
const parkinglotcont = require("../controller/parkinglotcont");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/addparkinglot",auth.authenticateToken, parkinglotcont.addParkinglot);
router.get("/getparkinglots",auth.authenticateToken, parkinglotcont.findAllparkinglots);
router.get("/getlocation/:l_name", auth.authenticateToken, parkinglotcont.findParkinglotbylocation);
router.get("/getparkinglot/:parkinglot_name" , auth.authenticateToken, parkinglotcont.findAParkinglot);
router.patch("/updateparkinglot/:parkinglot_name", auth.authenticateToken,  parkinglotcont.updateParkinglot);
router.delete("/deleteparkinglot/:parkinglot_name", auth.authenticateToken, parkinglotcont.deleteParkinglot);

module.exports=router;