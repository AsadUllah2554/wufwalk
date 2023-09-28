const User = require('../models/userModel')



    const getDogs = async (req, res) => {
        const { username } = req.params; // Assuming you are passing the username as a parameter
      
        try {
          // Find the user by username
          const user = await User.findOne({ username });
      
          if (!user) {
            return res.status(404).json({ msg: "User not found" });
          }
          // Access the user's dogs array from the user object
          const userDogs = user.dogs;
      
          res.status(200).json(userDogs);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };

  // Add a new Dog to Dogs Array
  // Grab user ID and send new dog

  // Delete Dog ID will be given delete that dog
      

module.exports = { getDogs }

