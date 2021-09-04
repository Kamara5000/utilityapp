
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const myContact = require('../contactModel');
const {myJwtMdw} = require('../myJWT');
require('dotenv').config();

const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });

router.get("/:username",myJwtMdw, (req,resp)=>{
    let {username} = req.params;
    //console.log(username)
    myContact.find({user_username:username}).then(res=>{
    console.log(res);
    resp.json(res)
    })
});

//to use cloudinary
const multer = require('multer');
    const cloudinary = require('cloudinary').v2;
    const {CloudinaryStorage} = require('multer-storage-cloudinary');
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
    const storage = new CloudinaryStorage({
        cloudinary,
        params:{
            folder: 'uploads/',
            allowedFormats: ['jpeg','PNG', 'JPG','jpg', 'png']
        }
    })
    const upload = multer({storage:storage});

router.post("/add/:username",upload.single('img'), myJwtMdw, async(req, resp)=>{
     let path = "";
    let {username} = req.params;

    let pId = "";
    //  console.log(req.body)
    //  console.log(req.file)

     
     if (req.file) {
        path = req.file.path; 
        const result = await cloudinary.uploader.upload(path);  
         pId = result.public_id;
        console.log(result);
     }

   
     // Create new user
    // let user = new User({
    //   name: req.body.name,
    //   avatar: result.secure_url,
    //   cloudinary_id: result.public_id,
    // });

   
     
    
     let {mail,name,phone,address,instagram,twitter,img} = req.body;
    let createdContact = await myContact.create({name:name, email:mail, phone:phone, address:address, instagram:instagram, twitter:twitter, imgUrl:path, imgPublicId:pId, user_username:username});        
    //console.log(createdContact);
    resp.json({message:"success"})

})

router.post("/delete/:_id",upload.single('img'), myJwtMdw, async(req, resp)=>{

    let imgPublicId = req.body;
    let _id = req.params;
    //console.log(_id._id)
     let imgpath = imgPublicId.imgPublicId;
     //console.log(imgpath)
     
 

    if (imgpath != "" ) {
        const result = await cloudinary.uploader.destroy(imgpath);
            console.log(result);
             let deleteContact = await myContact.deleteOne({_id:_id}); 
             console.log("done")      
            resp.json({message:"success"})
         
     }else{
        let deleteContact = await myContact.deleteOne({_id:_id}); 
                console.log("done")      
               resp.json({message:"success"})
     }
    
    
    

})

router.post("/edit/:_id",upload.single('img'), myJwtMdw, async(req, resp)=>{
    let _id = req.params;
    let oldImgPath = req.body.oldImgUrl;
    let {mail,name,phone,address,instagram,twitter,img} = req.body;
    //console.log(_id)
    console.log(req.body);
    console.log(req.file);
    
    if (req.file) {
        //if the image want to be updated we delete the old image from the cloud first
        const result = await cloudinary.uploader.destroy(oldImgPath);
        console.log(result);

        //then save the new image in cloud
        let newPath = req.file.path; 
        const newResult = await cloudinary.uploader.upload(newPath);  
        let pId = newResult.public_id;

        //then update the database 
        let updateContact = await myContact.findOneAndUpdate({_id:_id},{name:name, email:mail, phone:phone, address:address, instagram:instagram, twitter:twitter, imgUrl:newPath, imgPublicId:pId}, {useFindAndModify:false, new:true , runValidators:true}).then(res=>console.log("new updated" ,res));
        //console.log(result);
     }else{

        //if not changing image  update database
        myContact.findOneAndUpdate({_id:_id},{name:name, email:mail, phone:phone, address:address, instagram:instagram, twitter:twitter},  {useFindAndModify:false, new:true , runValidators:true}).then(res=>console.log("new updated" ,res));
     }


     resp.json({message:"success"})

})

module.exports = router;

