const express = require("express");
//const Location = require("../models/location");
const parkinglotcont = require("../controller/parkinglotcont");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/addparkinglot", parkinglotcont.addParkinglot);
router.get("/getparkinglots", parkinglotcont.findAllparkinglots);
router.get("/getlocation/:l_name", auth.authenticateToken, parkinglotcont.findParkinglotbylocation);
router.get("/getparkinglot/:_id", parkinglotcont.findAParkinglot);
router.patch("/updateparkinglot/:_id", auth.authenticateToken,  parkinglotcont.updateParkinglot);
router.delete("/deleteparkinglot/:_id", auth.authenticateToken, parkinglotcont.deleteParkinglot);

module.exports=router;