const express = require("express");
const reviewscont = require("../controller/reviewscont");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/addreviews",auth.authenticateToken, reviewscont.addreview);
router.get("/getreviews",reviewscont.findAllreviews);
router.delete("/deletereviews/:rating", auth.authenticateToken, reviewscont.deletereviews);
router.get("/getreviewsbyparking/:parking_lott", auth.authenticateToken,reviewscont.findreviewsbylocation);

module.exports=router;