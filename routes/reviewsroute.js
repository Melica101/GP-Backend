const express = require("express");
const reviewscont = require("../controller/reviewscont");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/addreviews",auth.authenticateToken, reviewscont.addreview);
router.get("/getreviews", auth.authenticateToken,reviewscont.findAllreviews);
router.delete("/deletereviews/:rating", auth.authenticateToken, reviewscont.deletereviews);


module.exports=router;