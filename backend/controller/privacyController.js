const PrivacySection = require("../model/privacy");

// Get all Privacys
exports.getPrivacys = async (req, res) => {
  try {
    const sections = await PrivacySection.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Privacys." });
  }
};

// Add a new section
exports.addPrivacy = async (req, res) => {
  try {
    const { heading, content, bulletPoints } = req.body;
    const section = await PrivacySection.create({ heading, content, bulletPoints });
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: "Failed to add Privacy section." });
  }
};

// Update a section
exports.updatePrivacy = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content, bulletPoints } = req.body;
    const updated = await PrivacySection.findByIdAndUpdate(
      id,
      { heading, content, bulletPoints },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update Privacy section." });
  }
};

// Delete a section
exports.deletePrivacy = async (req, res) => {
  try {
    const { id } = req.params;
    await PrivacySection.findByIdAndDelete(id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete Privacy section." });
  }
};
