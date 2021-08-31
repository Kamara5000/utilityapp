const express = require('express');
const app = express();
const path = require('path');
const userLog = require('./routes/login');
const userReg = require('./routes/userReg');
const MyError = require('./errorFile');
const {storage,cloudinary} = require('./mycloud');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}))

const expressSession = require('express-session');
app.use(expressSession({secret:'mysecret', resave:false, saveUninitialized:false}));


//fileupload
    //we reqiure multer to be able to have file in our request with the urlencoded
    const multer = require('multer');

    const upload = multer({storage:storage});

//connecting to database
const mongoose = require('mongoose');
const uri = 'mongodb+srv://first_database:first_database@cluster0.sby1m.mongodb.net/twitter?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });

const methodOverride = require("method-override");
const { Passport } = require('passport');
const { json } = require('express');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

app.use('/register', userReg);
app.use('/login', userLog);


app.listen(5000, ()=>{
    console.log("runing on port 5000");
});