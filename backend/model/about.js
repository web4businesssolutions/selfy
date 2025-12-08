const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  heading: String,
  image: String,
  typewriterTexts: [String],
  introParagraphs: [String],
  mission: String,
  vision: String,
  features: [String],
  achievements: [{
    label: String,
    value: String,
  }],
  contactEmail: String,
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);

