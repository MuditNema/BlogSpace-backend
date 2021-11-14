const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'fs9f@#G6Ry+6TEmmgJD!FrEc*T4pqhD5EJz.25SQUJgAg';

const fetchUser = async (req,res,next) => {
    try {
        let token =  req.header('auth-token');
        if(!token){
            return res.send({"error":'No tokens there!!!!'})
        }
        const USERDATA =  jwt.verify(token,JWT_SECRET);
        req.UserData = await USERDATA.user;
        next();
    } catch (error) {
        res.send({error});
    }
}


module.exports = fetchUser;