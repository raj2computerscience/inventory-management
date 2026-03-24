const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current user (requires authentication)
router.get('/me', authMiddleware, authController.getCurrentUser);

// Refresh token
router.post('/refresh', authMiddleware, authController.refreshToken);

module.exports = router;
