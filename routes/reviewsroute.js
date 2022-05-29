const express = require("express");
const reviewscont = require("../controller/reviewscont");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/addreviews", reviewscont.addreview);
router.get("/getreviews",reviewscont.findAllreviews);
router.delete("/deletereviews/:_id", auth.authenticateToken, reviewscont.deletereviews);
router.get("/getreviewsbyparking/:parking_lott",reviewscont.findreviewsbylocation);

module.exports=router;