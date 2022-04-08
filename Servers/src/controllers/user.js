const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Error = require('../config/errors.json');
const Joi = require("joi");
const sendEmail = require("../utils/sendEmail");


const signup = async (req,res,next) =>{
try{
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        gender:req.body.gender,
        phoneNumber:req.body.phoneNumber,
        securityQuestion:req.body.question,
        securityAnswer:req.body.answer

    });

    user = await user.save();
    res.json({ user });

}catch(err){
    next(err);
}

}

const login = async (req,res,next) =>{
    try{
         console.log("Login method");
         if(!req.body.email && !req.body.password){
            throw{...Error[401], data:'Auth Failed'};
         }
       const user =  await User.findCredentials(req.body.email,req.body.password);
       const token = user.generateAuthToken();
       console.log(token);
       res.json({user,token});
    }catch(err){
        next(err);
    }


}

const forgotPassword = async (req,res,next) =>{
try {
   
   const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("user with given email doesn't exist");

    const token = user.generateAuthToken();
    const link = `http://localhost:4200/password-reset/${user._id}/${token}`;
    await sendEmail(user.email, "Password reset", link);

    //res.send("password reset link sent to your email account");
    res.status(200).json({ message: 'password reset link sent to your email account' });
} catch (error) {
    res.send("An error occured");
    next(error);
}
}

const link = async (req,res,next) =>{
try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = user.generateAuthToken();
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
} catch (error) {
    res.send("An error occured");
    next(error);
}
}

const validTokenCheck = async (req, res) => {
    
    if (!req.body.resettoken) {
    return res
    .status(500)
    .json({ message: 'Token is required' });
    }
    const decoded = jwt.verify(req.body.resettoken,process.env.SECRET);
    console.log("Decoded",decoded.exp);
    var date = new Date();
    var d = new Date(decoded.exp*1000);
    var tokenValid = date.getTime() > d.getTime();
    if(tokenValid){
        return res
    .status(409)
    .json({ message: 'Token Expired' });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ _id: user._userId }).then(() => {
    res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
    return res.status(500).send({ msg: err.message });
    });
}
    
const newPassword = async(req, res) => {
    const decoded = jwt.verify(req.body.resettoken,process.env.SECRET);
    console.log("Decoded",decoded.exp);
    var date = new Date();
    var d = new Date(decoded.exp*1000);
    var tokenValid = date.getTime() > d.getTime();
    if(tokenValid){
        return res
    .status(409)
    .json({ message: 'Token Expired' });
    }
          User.findOne({
            _id: decoded.userId
          }, function (err, userEmail, next) {
            
            if (!userEmail) {
              return res
                .status(409)
                .json({ message: 'User does not exist' });
            }
              console.log("User ",userEmail);
              userEmail.password = req.body.newPassword;
              userEmail.save(function (err) {
                if (err) {
                 console.log(err);
                  return res
                    .status(400)
                    .json({ message: 'Password can not reset.' });
                } else {
                  //userToken.remove();
                  return res
                    .status(201)
                    .json({ message: 'Password reset successfully' });
                }
    
              });
            });
    
}


const getUser =  async (req,res,next)=>{
    try{
    console.log("Hi");
    //var id = req.params.id;       
    //var good_id = new ObjectId(id);
    const user1 = await User.findById(req.params.userId);
    console.log("User",user1);
    if(!user1){
        console.log("User not found");
        throw{
            ...Error[404],
            data:`Unable to fetch product details`
        }
    }
    console.log("User",user1);
    res.json({user1});
}catch(err){
    next(err);
}
}

const editUser = async(req,res,next)=>{
    console.log("Edit user body",req.body);
    console.log("Edit user name",req.body.firstName);
    try{
        let user1 = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            phoneNumber:req.body.phoneNumber
    
        });
        console.log("Id",req.body._id);
        User.findByIdAndUpdate(
            {_id: req.body._id}
          , {
              firstName: user1.firstName,
              lastName: user1.lastName,
              email: user1.email, 
              gender: req.body.gender,
              phoneNumber:req.body.phoneNumber
            }
            , {new: true})
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.body._id
                    });
                }
                res.send(user);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params._id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params._id
                });
            });

    }catch(err){
        next(err);
    }
}

exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
exports.forgotPassword = forgotPassword;
exports.link = link;
exports.validTokenCheck = validTokenCheck;
exports.newPassword = newPassword;
exports.editUser = editUser;