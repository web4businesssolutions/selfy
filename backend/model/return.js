const mongoose = require("mongoose");

const returnSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  content: { type: String, required: false }, // optional paragraph
  bulletPoints: [String], // optional bullet points
}, { timestamps: true });

module.exports = mongoose.model("ReturnSection", returnSectionSchema);
