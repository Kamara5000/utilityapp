const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });


const contactSchema = new mongoose.Schema({

    user_username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        maxlength:50
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
        maxlength:15
    },
    address: {
        type: String,
        maxlength:50
    },
    twitter: {
        type: String,
        maxlength:50
    },
    instagram: {
        type: String,
        maxlength:50
    },
    imgUrl: {
        type: String,
    },
    imgPublicId:{
        type: String
    }
    
});

module.exports = mongoose.model('contacts',contactSchema);