const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  queryField: { type: String, required: true },
  queryDetails: { type: String, required: true },
});

const Contact = mongoose.model("Contact Requests", contactSchema);

module.exports = Contact;
