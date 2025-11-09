const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All user routes require authentication
router.use(authMiddleware);

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Delete account
router.delete('/profile', userController.deleteAccount);

module.exports = router;
