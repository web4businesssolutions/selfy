const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  logoUrl: { type: String },
  description: { type: String },

  socialLinks: [
    {
      platform: String, // e.g., "facebook"
      iconClass: String, // e.g., "fab fa-facebook-f"
      url: String
    }
  ],

  contact: {
    address: String,
    phone: String,
    email: String
  },

  newsletter: {
    title: String,
    placeholderName: String,
    placeholderEmail: String,
    buttonText: String
  },

  quickLinks: [
    {
      section: String, // e.g., "Company", "Legal"
      links: [
        {
          label: String, // e.g., "About Us"
          path: String
        }
      ]
    }
  ],

  bottomLinks: [
    { label: String, path: String }
  ],

  copyrightText: String
});

module.exports = mongoose.model("Footer", footerSchema);
