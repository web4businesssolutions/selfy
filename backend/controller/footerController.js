const Footer = require("../model/footer");

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}; 

exports.createFooter = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.file) data.logoUrl = req.file.path;

    const footer = new Footer(data);
    await footer.save();
    res.status(201).json(footer);
  } catch (err) {
    res.status(500).json({ message: "Error creating footer" });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (req.file) data.logoUrl = req.file.path;

    const updated = await Footer.findByIdAndUpdate(req.params.id, data, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating footer" });
  }
};

exports.deleteFooter = async (req, res) => {
  try {
    await Footer.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting footer" });
  }
};
