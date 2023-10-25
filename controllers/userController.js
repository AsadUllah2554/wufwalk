const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// login User

function generate4DigitOTP() {
  const min = 1000; // Minimum 4-digit number (1000)
  const max = 9999; // Maximum 4-digit number (9999)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

// Login User function
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup User function
const signupUser = async (req, res) => {
  const { email, password, username, name, dogs } = req.body;
  console.log(dogs);

  // Creating user in MongoDB
  try {
    const user = await User.signup(email, password, username, name, dogs);
    const id = user._id;
    const token = createToken(user._id);
    res.status(200).json({ id, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verify function to verify user and send OTP to email
const verifyUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.verifyUser(email);
    const otp = generate4DigitOTP();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 600000;
    await sendOTPByEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email, OTP is:", otp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// resetPasswordWithOTP function to reset password with OTP
const resetPasswordWithOTP = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Fetch the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Call the updatePassword method to rehash and update the password
    await User.updatePassword(email, newPassword);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// sendOTPByEmail function to send OTP to email
async function sendOTPByEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "axsad398@gmail.com",
      pass: "fgcr ahol fkjg zdnz",
    },
  });

  const mailOptions = {
    from: "axsad398@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

// Get user profile
const getProfile = async (req, res) => {
  const { userID } = req.params; // Assuming you pass the user's ID as a parameter

  try {
    // Find the user by ID and select the fields you want to include in the response
    const user = await User.findById(userID).select("name username email dogs");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the user's profile as a JSON response
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { userID } = req.params;
  const updatedFields = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided email and username already exist in other user documents
    if (updatedFields.email) {
      const existingEmailUser = await User.findOne({
        email: updatedFields.email,
      });
      if (existingEmailUser && existingEmailUser._id.toString() !== userID) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    if (updatedFields.username) {
      const existingUsernameUser = await User.findOne({
        username: updatedFields.username,
      });
      if (
        existingUsernameUser &&
        existingUsernameUser._id.toString() !== userID
      ) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    // Update specific fields in the user's profile
    if (updatedFields.name) {
      user.name = updatedFields.name;
    }
    if (updatedFields.email) {
      user.email = updatedFields.email;
    }

    if (updatedFields.username) {
      user.username = updatedFields.username;
    }
    if (updatedFields.dogs) {
      user.dogs = updatedFields.dogs;
    }

    // Save the updated user profile
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyUser,
  resetPasswordWithOTP,
  getProfile,
  updateProfile,
};

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
