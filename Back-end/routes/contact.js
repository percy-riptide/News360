const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/contact", async (req, res) => {
  const { email, phone, queryField, queryDetails } = req.body;
  try {
    // Create a new user object
    const newContactRequest = new Contact({
      email,
      phone,
      queryField,
      queryDetails,
    });
    // Save the new user into the collection
    await newContactRequest.save();
    return res
      .status(201)
      .json({ message: "Contact Query Sent! We will contact you soon!", signal: "0" });
  } catch (err) {
    console.error("Contact: Data was not inserted into the database", err);
    return res
      .status(500)
      .json({ message: "The Contact form was not sent! Please try sending it again!", signal: "2" });
  }
});

module.exports = router;