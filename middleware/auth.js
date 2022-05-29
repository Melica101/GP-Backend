const jwt = require('jsonwebtoken')
const User = require("../models/user")
function authenticateToken(req,res,next) {
    const authHeader = req.header["Authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null ) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, User) =>{
        if(err) return res.sendStatus(403);
        req.User = User;
        next();
    });
    
}
function generateAccessToken(phonenumber){
    return jwt.sign({data:phonenumber},process.env.JWT_SECRET_KEY,{
        expiresIn:"1h"
    } )
}
module.exports = {
    authenticateToken,
    generateAccessToken
}