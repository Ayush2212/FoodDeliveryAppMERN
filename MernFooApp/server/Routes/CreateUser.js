const express = require('express')
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require ('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt= require("bcryptjs")

router.post('/createuser',[
    body('email').isEmail(),
    body('password','Invalid pasword entered').isLength({min:5})], async(req,res)=>{

        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

        const salt=  await bcrypt.genSalt(10);
        let secPassword= await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            location:req.body.location,
            password: secPassword,
            email:req.body.email
        }).then(res.json({success:true}))
        

    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }
})

//login user api
router.post('/loginuser', [
    body('email').isEmail(),
    body('password','Invalid pasword entered').isLength({min:5})], async(req,res)=>{

        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() })
        }

    try {
        let email= req.body.email;

        let userData= await User.findOne({email});
        if(!userData){
            return res.send(400).json({errors: "email does not exist"})
        }

        if(!req.body.password=== userData.password){
            return res.status(400).json({errors: "invalid password. Password does not match"})
        }

        return res.json({success: true})
    } catch (error) {
        console.log(error)
        return res.json({success:false})
    }
})

module.exports = router;