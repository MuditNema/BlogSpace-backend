const mongoose = require('mongoose'); 
const mongoURI = 'mongodb://localhost:27017/blogspace?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'


const connectToMongo = async () =>{
    mongoose.connect(mongoURI,()=>{
        console.log('MongoDB Started on port 5000');
    })
}


module.exports = connectToMongo;


