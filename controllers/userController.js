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
        const { email, password,username,name,dogs } = req.body;
        console.log(dogs)
   // Get dogs from req.body
   // inside dogs {name,image}
   // grab dogs.image

   // process dogs.image using multer
   // upload dogs.images to firebase and get URL 
   // replace dogs.image with URL

   // create user
   
   // Creating user in MongoDB
        try {
           const user = await User.signup(email, password,username,name,dogs);
           const token = createToken(user._id);
           res.status(200).json({username,token})

        }catch(error){
            res.status(400).json({error:error.message})
        } 
   }

   module.exports = {loginUser , signupUser }

//    {  
//       "name":"Salman",
//       "username":"Asadasdasd2asdasasdd554",
//       "email":"asa2asdasd2@gmail.com",
//       "password": "as@!Asdsf1",
//       "dogs": [
//           {
//               "dogName": "Sam",
//               "image": "https://example.com/sam.jpg"
//           },
//           {
//               "dogName": "Rex",
//               "image": "https://example.com/rex.jpg"
//           }
//       ]
//   }