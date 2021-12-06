const mongoose = require('mongoose'); 
const mongoURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@blogspace-cluster.jw3h1.mongodb.net/blogspace?authSource=admin&replicaSet=atlas-102fc1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
const connectToMongo = async () =>{
    mongoose.connect(mongoURI,()=>{
        console.log(`MongoDB Started on port ${process.env.DB_PORT}`);
    })
}


module.exports = connectToMongo;


