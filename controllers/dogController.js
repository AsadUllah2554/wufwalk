const User = require('../models/userModel')

    const getDogs = async (req, res) => {
        const { userID } = req.params; // Assuming you are passing the username as a parameter
      
        try {
          // Find the user by username
        const user = await User.findById(userID);
          console.log(user)
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
    const addDog = async (req, res) => {

      const { userID } = req.params;
      const newDog = req.body; 

  try {
    // Find the user by their ID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new dog to the user's dogs array
    user.dogs.push(newDog);

    // Save the updated user profile with the new dog
    await user.save();

    res.status(201).json({ message: 'New dog added to profile', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

    }
  // Grab user ID and send new dog

  // Delete Dog ID will be given delete that dog

  const deleteDog = async (req, res) => {
    const { userID, dogID } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the dog to be deleted in the user's dogs array
    const dogIndex = user.dogs.findIndex((dog) => dog._id.toString() === dogID);

    if (dogIndex === -1) {
      return res.status(404).json({ message: 'Dog not found in user profile' });
    }

    // Remove the dog from the user's dogs array
    user.dogs.splice(dogIndex, 1);

    // Save the updated user profile with the dog removed
    await user.save();

    res.status(200).json({ message: 'Dog removed from profile', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
      

module.exports = { getDogs,addDog,deleteDog }

