const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Blog = require('../Database/models/Blog');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'fs9f@#G6Ry+6TEmmgJD!FrEc*T4pqhD5EJz.25SQUJgAg';

app.use(express.json());

router.get('/fetchblogs',fetchUser,async (req,res,next)=>{
    try {
        //Recieving all the blogs (for a particular user) as an array from our mongoDB
        const blogs = await Blog.find({user : req.UserData.id});
        req.send(blogs);
    } catch (error) {
        res.send({error : "Error Fetching blogs \n" +  error});
    }
})



module.exports = router