const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator')
const router = express.Router();
const Blog = require('../Database/models/Blog');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'fs9f@#G6Ry+6TEmmgJD!FrEc*T4pqhD5EJz.25SQUJgAg';

app.use(express.json());

router.get('/fetchblogs',fetchUser,async (req,res,next)=>{
    try {
        //Recieving all the blogs (for a particular user) as an array from our mongoDB
        const blogs = await Blog.find({user : req.UserData.id});
        res.send(blogs);
    } catch (error) {
        res.send({error : "Error Fetching blogs \n" +  error});
    }
})

router.post('/addblog',[
    body('title').isLength({min:5}),
    body('content').isLength({min:10})
],fetchUser,async (req,res,next)=>{
    try {
        //req.body will have content of the blog  (title,content)
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.send({error});
        }
        const userID = req.UserData.id;
        // userID is the ID of our current login user
        if(!userID){
            return res.send({"error" : "No user is loggedIN currently!"})
        }
        let BlogObj = {
            title : req.body.title,
            content : req.body.content,
            user : userID
        }
        const AddBlog = await Blog(BlogObj);
        const AddedBlog = await AddBlog.save();
        return res.send(AddedBlog);
    } catch (error) {
        res.send({error : "Error Adding blog \n" +  error});
    }
})


router.delete('/deleteblog/:id',fetchUser,async (req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.send({error : "No Blog Found"});
        }
        const result = await Blog.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.send({error : "Error Deleting blog \n" +  error});
    }
})
module.exports = router