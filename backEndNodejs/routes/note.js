
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const myNotes = require('../noteModel');
const {myJwtMdw} = require('../myJWT');
require('dotenv').config();

const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });

router.use((req,res,next)=>{
    next();
})



router.get("/:username",myJwtMdw, (req,resp)=>{
    let {username} = req.params;
    //console.log(username)
    myNotes.find({user_username:username}).then(res=>{
    console.log(res);
    resp.json(res)
    })
});



router.post("/add/:username", myJwtMdw, async(req, resp)=>{
    let {username} = req.params;
    let {title,body,d} = req.body;
    let createdNote= await myNotes.create({title:title, body:body, date:d, user_username:username});        
    console.log(createdNote);
    resp.json({message:"success"})

})

router.delete("/delete/:_id", myJwtMdw, async(req, resp)=>{
    let _id = req.params;
    let deleteNote = await myNotes.deleteOne({_id:_id}); 
    console.log("done")      
    resp.json({message:"success"})
})

router.patch("/edit/:_id", myJwtMdw, async(req, resp)=>{
    let _id = req.params;
    let {title,body} = req.body;

    //update the note 
    let updateNote = await myNotes.findOneAndUpdate({_id:_id},{title:title, body:body}, {useFindAndModify:false, new:true , runValidators:true}).then(res=>console.log("new updated" ,res));
    resp.json({message:"success"})
})

module.exports = router;

