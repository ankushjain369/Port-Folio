const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const Register = require("../models/register");
const auth = require("../middleware/auth");

router.get("/index",(req,res)=>{
    res.render("index");
})

router.get("/contact",(req,res)=>{
    res.render("contact");
})

router.get("/youtube",(req,res)=>{
    res.render("youtube");
})

router.get("/gallery",(req,res)=>{
    res.render("gallery");
})

router.get("/resume",(req,res)=>{
    res.render("resume");
})

router.get("/logout",auth,async (req,res)=>{
    try {
        req.registerPass.tokens=[];
        res.clearCookie("jwt");
        await req.registerPass.save();
        res.render("login");
        
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",async (req,res)=>{
    try {
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        if(pass === cpass){
            const registerUser = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                age:req.body.age,
                email:req.body.email,
                password:req.body.password,
                cpassword:req.body.cpassword
            })

            
            const token = await registerUser.generateAuthToken();

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+ 3000000)
            })

            const registered = await registerUser.save();
            res.status(201).render("login");
        }else{
            res.send("Incorrect Login Details")
        }
        
    } catch (error) {
        res.status(400).send(error);
        
    }
})

// Login Validation
router.post("/login",async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password,useremail.password);
        const token = await useremail.generateAuthToken();

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+30000)
        })

        if(isMatch){
            res.status(201).render('index')
        }else{
            res.send("Invalid Login Details")
        }
        
    } catch (error) {
        res.status(400).send("Invalid Login Details")
    }
})

module.exports = router;