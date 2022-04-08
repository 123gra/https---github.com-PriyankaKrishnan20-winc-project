const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const hash = require('../utils/hash');
const Error = require('../config/errors.json');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        minlength:6,
        maxlength:12
    },

    gender:{
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    securityQuestion:{
        type: String,
    },
    securityAnswer:{
        type: String,
    }

}, {timestamps: true});


userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;
    delete user.__v;
    return user;
}

userSchema.statics.findCredentials = async(email,password)=>{
    const user = await User.findOne({email});
        if(!user){
            throw{...Error[401], data:'Auth Failed'};
        }
        const validPassword = hash.decrypt(user.password,password);

        if(!validPassword){
            throw{...Error[401], data:'Auth Failed'};
        }

        return user;
}

userSchema.methods.generateAuthToken = function() {
    const user =  this;
    const token = jwt.sign({userId: user._id.toString() }, process.env.SECRET , {algorithm: 'HS512', expiresIn: '30m'});
    return token;
}

userSchema.pre('save',function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = hash.encrypt(user.password);
    }
    next();
})

const User = mongoose.model('users',userSchema);
module.exports = User;
