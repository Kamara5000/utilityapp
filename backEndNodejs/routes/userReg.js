
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const myUser = require('../userModel')

const uri = 'mongodb+srv://first_database:first_database@cluster0.sby1m.mongodb.net/utilityAppDb?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });
    
router.use(passport.initialize());
    //must be after the import of expresssession
    router.use(passport.session());
    passport.use(new PassportLocal(myUser.authenticate()));
    passport.serializeUser(myUser.serializeUser());
    passport.deserializeUser(myUser.deserializeUser());

router.post("/", async(req,res)=>{
    let {email, password} = req.body;
    console.log(email,password);
    
    let regUser = myUser({username:email, email:email})
    let createdUser = await myUser.register(regUser,password);
    console.log(createdUser);
    res.json({message: "success"});
    
});

module.exports = router;