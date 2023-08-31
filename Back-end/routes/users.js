const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const User=require("../models/user");
const emailsender=require("./emailsender");
const crypto = require('crypto');

// // MongoDB connection parameters
// const dbUri = 'mongodb+srv://jg581261:tubeligh@jagbirsingh.awpqywe.mongodb.net/news360';
// // Replace "username", "password", and "clustername" with your MongoDB credentials and cluster name
// const dbName = 'news360'; // Replace with your database name
// Register a new user

router.post('/otp', async (req, res) => {


  const otp= await emailsender(req.body.email);
  console.log(otp);
  if(otp.code==0){
    return res.status(200).json({ otp: otp.otp, signal: "0" });
  }
  else{
    return res.status(200).json({  signal: "1" });
  }


});


// set profile pic
router.post('/profilePic', async (req, res) => {
  try {
    const { email, profilePic } = req.body; // Assuming you send the userId and base64 profilePic in the request body

    // Find the user by their ID
    const user = await User.findById(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profilePic field with the provided base64 string
    user.profilePic = profilePic;
    await user.save();

    return res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ message: 'Internal server error try again later' });
  }
});



router.get('/profilePic/:email', async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by their ID
    const user = await User.findById(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the profilePic field as the response
    return res.status(200).json({ profilePic: user.profilePic });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password,language } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'Email already registered', signal: "1" });
    }

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      "password": hashPassword(password), // Hash the password before saving
      language,
    });

    // Save the new user into the collection
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful', signal: "0" });
  } catch (err) {
    console.error('Error during registration', err);
    return res.status(500).json({ message: 'Internal server error', signal: "2" });
  }
});



// login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'User not found', signal: '1' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = hashPassword(password) === user.password;

    if (!passwordMatch) {
      return res.status(200).json({ message: 'Invalid password', signal: '1' });
    }

    // Passwords match, so login is successful
    return res.status(200).json({ message: 'Login successfull', signal: '0', language: user.language, categories: user.categories });
  } catch (err) {
    console.error('Error during login', err);
    return res.status(500).json({ message: 'Internal server error', signal: '2' });
  }
});

// Get user details by email
router.get('/user/:email', async (req, res) => {
  const email = req.params.email;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'User not found', signal: "1" });
    }

    // User found, return user details
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error getting user details', err);
    return res.status(500).json({ message: 'Internal server error', signal: "1" });
  }
});


router.post('/preferences/set', async (req, res) => {
  const { email, language, categories } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'User not found', signal: "1" });
    }

    await User.updateOne({ email }, { $set: { language: language, categories: categories } });

    return res.status(200).json({ message: 'Update successful' });
  } catch (err) {
    console.error('Error getting user details', err);
    return res.status(500).json({ message: 'Internal server error', signal: "1" });
  }
});

// Update user details
router.post('/user/update/', async (req, res) => {
  const { email, ...updateData } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(202).json({ message: 'User not found' });
    }

    // If user exists, update the user data
    await User.updateOne({ email }, { $set: updateData });

    return res.status(200).json({ message: 'Update successful' });
  } catch (err) {
    console.error('Error during update', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});






// Route to handle password change
router.post('/changePassword', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' ,signal:1});
    }

    // Check if the current password matches the one in the database
    const isPasswordValid = hashPassword(currentPassword) === user.password;

    if (!isPasswordValid) {
      return res.status(200).json({ message: 'Invalid current password',signal:1});
    }


    // Update the user's password in the database
    await User.updateOne({ email }, { $set: { password: hashPassword(newPassword) } });

    return res.status(200).json({ message: 'Password changed successfully' ,signal:0});
  } catch (err) {
    console.error('Error during password change', err);
    return res.status(500).json({ message: 'Internal server error', signal : 1 });
  }
});


// Route to handle password change
router.post('/changeForgotPassword', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' ,signal:1});
    }

    // Check if the current password matches the one in the database



    // Update the user's password in the database
    await User.updateOne({ email }, { $set: { password: hashPassword(newPassword) } });

    return res.status(200).json({ message: 'Password changed successfully' ,signal:0});
  } catch (err) {
    console.error('Error during password change', err);
    return res.status(500).json({ message: 'Internal server error', signal : 1 });
  }
});




function hashPassword(password) {
  const sha256 = crypto.createHash('sha256');
  const hashedPassword = sha256.update(password).digest('hex');
  return hashedPassword;
}



module.exports = router;
