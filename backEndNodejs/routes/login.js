const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const myUser = require('../userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const uri = 'mongodb+srv://first_database:first_database@cluster0.sby1m.mongodb.net/twitter?retryWrites=true&w=majority';
// mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });

const secret = process.env.JWT_SECRET;

    
router.use(passport.initialize());
    
    router.use(passport.session());
    passport.use(new PassportLocal(myUser.authenticate()));
    passport.serializeUser(myUser.serializeUser());
    passport.deserializeUser(myUser.deserializeUser());

router.post("/", passport.authenticate('local', {failureFlash: true, failureRedirect: '/'}), async(req,res)=>{
    //req.flash('error',  'incorrect username or password');
    let user = req.body;
    console.log(user)
    let Signed = jwt.sign(user, secret, {expiresIn: '86400s'});

    res.json({message: "log in success", token: Signed});
    

    
});

module.exports = router;