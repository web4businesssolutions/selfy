const About = require('../model/about');
// Create
exports.createAbout = async (req, res) => {
  const data = JSON.parse(req.body.data);
  if (req.file) {
    data.image = `/uploads/${req.file.filename}`;
  }
  const about = await About.create(data);
  res.status(201).json(about);
};

// Read
exports.getAbout = async (req, res) => {
  const abouts = await About.find();
  res.json({ data: abouts }); // ✅ sends array
};


// Update
exports.updateAbout = async (req, res) => {
  try {
    let data;

    if (req.body.data) {
      data = JSON.parse(req.body.data);
    } else {
      data = req.body; // fallback when no JSON string is sent (like simple form)
    }

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const updated = await About.findByIdAndUpdate(req.params.id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "About not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


// Delete
exports.deleteAbout = async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
