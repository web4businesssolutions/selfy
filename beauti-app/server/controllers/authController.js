const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Registered successfully', token });
  } catch (err) {
    console.error('❌ Registration Error:', err);  // 👈 This line shows the real error
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;

pgsql
Copy
Edit
// Find user
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });

// Check password
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });

// Generate token
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

res.json({ message: 'Login successful', token });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};