const mongoose = require('mongoose'); 
// const mongoURI = 'mongodb://localhost:27017/blogspace?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const mongoURI = 'mongodb+srv://atsumu_miya:Atsumu_miya123@cluster0.fda3r.mongodb.net/blogspace?authSource=admin&replicaSet=atlas-wgpzno-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

const connectToMongo = async () =>{
    mongoose.connect(mongoURI,()=>{
        console.log('MongoDB Started on port 5000');
    })
}


module.exports = connectToMongo;


