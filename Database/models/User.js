
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('user',UserSchema); 