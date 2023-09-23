const express = require('express');

const { signupUser, loginUser, verifyUser, resetPasswordWithOTP } = require('../controllers/userController');
const router = express.Router();

// login route 
router.post('/login', loginUser) 

// signup route
router.post('/signup', signupUser)

// send OTP
router.post('/verify', verifyUser)

// change password
router.post('/reset/password', resetPasswordWithOTP)



module.exports = router;