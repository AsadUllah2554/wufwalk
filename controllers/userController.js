const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// login User

function generate4DigitOTP() {
   const min = 1000; // Minimum 4-digit number (1000)
   const max = 9999; // Maximum 4-digit number (9999)
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 
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

   // Creating user in MongoDB
        try {
           const user = await User.signup(email, password,username,name,dogs);
           const token = createToken(user._id);
           res.status(200).json({username,token})

        }catch(error){
            res.status(400).json({error:error.message})
        } 
   }

   const verifyUser = async (req, res) => {
      const {email} = req.body;
      try {
         const user = await User.verifyUser(email);
         const otp = generate4DigitOTP();

         user.resetPasswordOtp = otp;
         user.resetPasswordExpires = Date.now() + 600000; 
         await sendOTPByEmail(email, otp);
         res.status(200).json({ message: 'OTP sent to your email, OTP is:', otp  });
    }
    catch(error){
      res.status(400).json({ error: error.message });
   }}

    const resetPasswordWithOTP = async (req, res) => {
      const { email, newPassword } = req.body;
      
      try {
        // Fetch the user with the provided email
        const user = await User.findOne({ email });
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
       // Call the updatePassword method to rehash and update the password
    await User.updatePassword(email, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
      
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    }

    async function sendOTPByEmail(email, otp) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'axsad398@gmail.com',
          pass: 'fgcr ahol fkjg zdnz',
        },
      });
    
      const mailOptions = {
        from: 'axsad398@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };
    
      await transporter.sendMail(mailOptions);
    }


   module.exports = {loginUser , signupUser, verifyUser, resetPasswordWithOTP }

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