const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  heading: String,
  description: String,
  headOffice: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('Contact', contactSchema);
