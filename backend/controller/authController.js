const User = require('../model/User');
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
};

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = generateToken(user);
        res.status(201).json({ user, token })

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ error: 'invalid Credentials' })
    const token = generateToken(user);
    console.log(token);
    res.status(200).json({ user, token })
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json(user);
};

