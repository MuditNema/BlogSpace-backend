const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JW_TOKEN;

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