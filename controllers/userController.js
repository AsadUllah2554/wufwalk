const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
// login User

const createToken = (_id) => {

   return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
}
const loginUser = async (req, res) => {

  const { username, password } = req.body;
  try {
     const user = await User.login(username, password);
     const token = createToken(user._id);
     res.status(200).json({username,token})

     
  }catch(error){
      res.status(400).json({error:error.message})
  } 
  
}

   // signup User
   const signupUser = async (req, res) => {
        const { email, password,username,name,dogname } = req.body;
        try {
           const user = await User.signup(email, password,username,name,dogname);
           const token = createToken(user._id);
           res.status(200).json({username,token})

        }catch(error){
            res.status(400).json({error:error.message})
        } 
   }

   module.exports = {loginUser , signupUser }