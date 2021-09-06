const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.url;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true });


const noteSchema = new mongoose.Schema({

    user_username: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: String,
    },
    
});

module.exports = mongoose.model('notes',noteSchema);