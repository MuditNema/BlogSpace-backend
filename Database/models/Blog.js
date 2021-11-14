
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const BlogSchema = Schema({
    title : {
        type : String,
        required:true
    },
    content : {
        type : String,
        required:true
    },
    date : {
        type : Date ,
        default : Date.now
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model('blog',BlogSchema); 