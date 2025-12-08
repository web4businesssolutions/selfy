const shippingSection = require("../model/shipping");

// Get all Shippings
exports.getShippings = async (req, res) => {
  try {
    const sections = await shippingSection.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Shippings." });
  }
};

// Add a new section
exports.addShipping = async (req, res) => {
  try {
    const { heading, content, bulletPoints } = req.body;
    const section = await shippingSection.create({ heading, content, bulletPoints });
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ error: "Failed to add Shipping section." });
  }
};

// Update a section
exports.updateShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, content, bulletPoints } = req.body;
    const updated = await shippingSection.findByIdAndUpdate(
      id,
      { heading, content, bulletPoints },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update Shipping section." });
  }
};

// Delete a section
exports.deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;
    await shippingSection.findByIdAndDelete(id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete Shipping section." });
  }
};
