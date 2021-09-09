const express = require('express');
const app = express();
const path = require('path');
const contact = require('./routes/contact');
const notes = require('./routes/note');
const todos = require('./routes/todo');
const MyError = require('./errorFile');
const {storage,cloudinary} = require('./mycloud');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}))

const expressSession = require('express-session');
app.use(expressSession({secret:'mysecret', resave:false, saveUninitialized:false}));

const connectFlash = require('connect-flash');
app.use(connectFlash());

const secret = process.env.JWT_SECRET;

//fileupload
    //we reqiure multer to be able to have file in our request with the urlencoded
const multer = require('multer');

const upload = multer({storage:storage});

const passport = require('passport');
const PassportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


//connecting to database
const mongoose = require('mongoose');
const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });


const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength:50
    }
});

userSchema.plugin(passportLocalMongoose);
const myUser = mongoose.model('user',userSchema);

app.use(passport.initialize());
    //must be after the import of expresssession
    app.use(passport.session());
    passport.use(new PassportLocal(myUser.authenticate()));
    passport.serializeUser(myUser.serializeUser());
    passport.deserializeUser(myUser.deserializeUser());


app.post("/register", async(req,res)=>{
    let {email, password} = req.body;
    console.log(email,password);
    
    try {

        myUser.findOne({email:email}).then(resp=>{
            if(!resp){
                let regUser = myUser({username:email, email:email})
                let createdUser = myUser.register(regUser,password);
                console.log(createdUser);
                res.json({message: "success"});
            }else{
                res.json({message:"user exist"})
            }
        })

    } catch (error) {
        console.log(error)
    }
});

app.post("/login", passport.authenticate('local', {failureFlash: true, failureRedirect: '/'}), async(req,res)=>{
   let user = req.body;
   console.log(user)
   let Signed = jwt.sign(user, secret, {expiresIn: '1440s'});

    res.json({message: "success", token: Signed, username:user.username});
});


 

app.use('/contact', contact);
app.use('/notes', notes);
app.use('/todo', todos);

app.listen(5000, ()=>{
    console.log("runing on port 5000");
});