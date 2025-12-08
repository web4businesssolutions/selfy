const TermsSection = require("../model/term");

// Get all terms
exports.getTerms = async (req, res) => {
  try {
    const sections = await TermsSection.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch terms." });
  }
};

// Add a new section
exports.addTerm = async (req, res) => {
  try {
    const { heading, content, bulletPoints } = req.body;
    const section = await TermsSection.create({ heading, content, bulletPoints });
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: "Failed to add term section." });
  }
};

// Update a section
exports.updateTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content, bulletPoints } = req.body;
    const updated = await TermsSection.findByIdAndUpdate(
      id,
      { heading, content, bulletPoints },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update term section." });
  }
};

// Delete a section
exports.deleteTerm = async (req, res) => {
  try {
    const { id } = req.params;
    await TermsSection.findByIdAndDelete(id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete term section." });
  }
};
