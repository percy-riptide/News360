//author: Navaneeth manikyala(b00917982)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, required: false },
    linkedIn: { type: String, required: false },
    twitter: { type: String, required: false },
    language: { type: String, required: false },
    categories: { type: Array, required: false },
    profilePic: {  
      data: Buffer, 
      contentType: String  } // Add the profilePic field
    // Add other fields like bio, linkedIn, twitter, etc. here if needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
