const mongoose = require('mongoose');
const passport = require('passport');
const PassportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength:50
    }
});

userSchema.plugin(passportLocalMongoose);
//it must be before the model

module.exports = mongoose.model('user',userSchema);