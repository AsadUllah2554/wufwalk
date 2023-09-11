
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

// Schema is a blueprint for the data that will be saved in the database

const dogSchema = new Schema({
    dogName: {
        type: String,
        required: false,
    },
    image: {
        type: String, // You can change this to an appropriate data type for storing image URLs
        required: false, // Make it required if you want to enforce image URLs for all dogs
    },
});
const userSchema = new Schema({
     
    name:{
        type:String,
        required:true,
       
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dogs: [dogSchema],
   
})

// static signup Method

userSchema.statics.signup = async function(email,password,username,name,dogs){

    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    const exists = await this.findOne({email});
    const usernameexist = await this.findOne({username});
    if(exists){
        throw Error('Email already exists')
    }

    if(usernameexist){
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hashedPassword,username,name,dogs});
    return user;
}

// static login Method

userSchema.statics.login = async function(username,password){
    // validation
    if(!username || !password){
        throw Error('Username or Password is missing')
    }

    const user = await this.findOne({username});

    if(!user){
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect password')
    }

    return user;

   
}

module.exports = mongoose.model('User', userSchema);
