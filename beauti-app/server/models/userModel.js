const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
role: { type: String, enum: ['vendor', 'customer'], default: 'customer' }
});

// Hash password before saving
userSchema.pre('save', async function () {
if (this.isModified('password')) {
this.password = await bcrypt.hash(this.password, 10);
}
});

module.exports = mongoose.model('User', userSchema);