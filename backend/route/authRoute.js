const express = require('express');
const { register, login, getMe } = require('../controller/authController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, getMe);

module.exports = router;
