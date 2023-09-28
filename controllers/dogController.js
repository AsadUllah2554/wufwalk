const User = require('../models/userModel')

// getting dogs of a user
    const getDogs = async (req, res) => {
        const { userID } = req.params; // Assuming you are passing the username as a parameter
      
        try {
          // Find the user by username
        const user = await User.findById(userID);
    
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
 
    // Delete dogs from Dogs Array
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

   // Updating dogs of a user 
  const updateDogs = async (req, res) => {
    const { userID, dogID } = req.params;
    const updatedDogData = req.body; 

    try {
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the dog to be updated by its ID in the user's dogs array
      const dogToUpdate = user.dogs.find((dog) => dog._id.toString() === dogId);
  
      if (!dogToUpdate) {
        return res.status(404).json({ message: 'Dog not found in user profile' });
      }
  
      // Update the dog's information
      if (updatedDogData.dogName) {
        dogToUpdate.dogName = updatedDogData.dogName;
      }
      if (updatedDogData.image) {
        dogToUpdate.image = updatedDogData.image;
      }
      // Add other fields as needed
  
      // Save the updated user profile with the dog's information updated
      await user.save();
  
      res.status(200).json({ message: 'Dog updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }
      

module.exports = { getDogs,addDog,deleteDog }

