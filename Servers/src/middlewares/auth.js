const jwt = require('jsonwebtoken');

const User = require('../models/users');

const errors = require('../config/errors.json');
const verifyAuth = async(req,res,next) =>{
    try{
    const token = req.headers.authorization;
    if(!token){
        throw{...errors[403], data:'Please Authenticate'}
    }

    token = token.split(' ')[1];
    const decoded = jwt.verify(token,process.env.SECRET);

    const user = User.findOne({_id:decoded.userId});
    if(!user){
        throw{...errors[404], data:'User with Id not found'}
    }

    req.user = decoded;
    next();
}catch(err){
    next(err);
}
}

module.exports = verifyAuth;