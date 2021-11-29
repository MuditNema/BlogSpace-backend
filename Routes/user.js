const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../Database/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = 'fs9f@#G6Ry+6TEmmgJD!FrEc*T4pqhD5EJz.25SQUJgAg';
app.use(express.json())


router.post('/createuser',[
    body('fname').isLength({min:5}),
    body('lname').exists(),
    body('password').isStrongPassword(),
    body('email').isEmail()
],async(req,res)=>{
    try {
        let prod = await User.findOne({email : req.body.email});
        if(prod){
            return res.send({"error" : "User Already Exists"});
        }
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.send({"error" : error});
        }
        //Setting up my password as hash string usig bcrypt
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password,salt);
        let Obj = {
            firstName : req.body.fname,
            lastName : req.body.lname,
            email :  req.body.email,
            password : secPass
        }

        const result = await User(Obj);
        const user = await result.save();
        res.send({user});

    } catch (error) {
        res.send({error});
    }

})

router.post('/loginuser',async(req,res)=>{
    let success = false;
    try {

        const error =  validationResult(req)
        if(!error.isEmpty()){
            return res.send({error,success})
        
        }
        const {email,password} = req.body;
        let authtoken = '';
        let user = await User.findOne({email})
        if(!user){
            success = false;
            return res.send({authtoken,'error':'No user found',success})
        }
        const PassCompare = await bcrypt.compare(password,user.password);
        if(!PassCompare){
            success = false;
            return res.send({authtoken,'error':'Wrong Password',success})
        }
        let data = {
            user : {id:user.id}
        }
        // authtoken will have a payload as an object with user id in it which can be later extracted using a middleware to authenticate the user
        authtoken  =   jwt.sign(data,JWT_SECRET);
        success = true;
        return res.send({authtoken,'error':'Successful Login',success});
    }
    catch (error) {
        res.send({authtoken,error,success});
    }

    router.post('/getuser/:id', fetchUser , async (req,res,next) => {
        try {
            const GetUser = await User.findOne({_id : req.params.id});
            res.send({GetUser,success : true});          
        } catch (error) {
            res.send({error})
        }
    })
})

module.exports = router