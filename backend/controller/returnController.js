const ReturnSection = require("../model/return");

// Get all Returns
exports.getReturns = async (req, res) => {
  try {
    const sections = await ReturnSection.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Returns." });
  }
};

// Add a new section
exports.addReturn = async (req, res) => {
  try {
    const { heading, content, bulletPoints } = req.body;
    const section = await ReturnSection.create({ heading, content, bulletPoints });
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: "Failed to add Return section." });
  }
};

// Update a section
exports.updateReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content, bulletPoints } = req.body;
    const updated = await ReturnSection.findByIdAndUpdate(
      id,
      { heading, content, bulletPoints },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update Return section." });
  }
};

// Delete a section
exports.deleteReturn = async (req, res) => {
  try {
    const { id } = req.params;
    await ReturnSection.findByIdAndDelete(id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete Return section." });
  }
};
