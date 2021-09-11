
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {myJwtMdw} = require('../myJWT');
require('dotenv').config();

const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });
const todoSchema = new mongoose.Schema({

    user_username: {
        type: String,
        required: true
    },
    
    todo: {
        type: String,
    },
    
});

const myTodo = mongoose.model('todo',todoSchema);

router.use((req,res,next)=>{
    next();
})



router.get("/:username",myJwtMdw, (req,resp)=>{
    let {username} = req.params;
    //console.log(username)
    myTodo.find({user_username:username}).then(res=>{
    console.log(res);
    resp.json(res)
    })
});



router.post("/add/:username", myJwtMdw, async(req, resp)=>{
    let {username} = req.params;
    //console.log(req.body.todo)
    let {todo} = req.body;
    let createdTodo= await myTodo.create({todo:todo ,user_username:username});        
    console.log(createdTodo);
    resp.json({message:"success"})

})

router.delete("/delete/:_id", myJwtMdw, async(req, resp)=>{
    let _id = req.params;
    let deleteTodo = await myTodo.deleteOne({_id:_id}); 
    console.log("done")      
    resp.json({message:"success"})
})


module.exports = router;

