// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to initiate OAuth flow
router.get('/login', authController.initiateOAuth);

// OAuth callback route
router.get('/callback', authController.handleCallback);

// Route to check authentication status
router.get('/status', authController.checkAuth);

module.exports = router;