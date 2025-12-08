const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  updateUserStatus,
  deleteUser
} = require('../controller/userController');

const { isAuthenticated } = require('../middleware/auth');

// Get all users (admin-only route)
router.get('/all', isAuthenticated, getAllUsers);

// Update user active status (approve/decline toggle)
router.put('/status/:id', isAuthenticated, updateUserStatus);

// Delete a user by ID
router.delete('/delete/:id', isAuthenticated, deleteUser);

module.exports = router;
