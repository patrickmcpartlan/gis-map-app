// src/routes/featuresRoutes.js
const express = require('express');
const router = express.Router();
const featuresController = require('../controllers/featuresController');

// Route to get features
router.get('/', featuresController.getFeatures);

module.exports = router;