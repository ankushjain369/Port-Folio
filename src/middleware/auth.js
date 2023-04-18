const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const verifyRegister=jwt.verify(token,process.env.SECRET_KEY);
        const registerPass=await Register.findOne({_id:verifyRegister._id});

        req.token=token;
        req.registerPass=registerPass

        next()
        
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports=auth