// src/routes/api.js
const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Route to get features from ArcGIS feature service
router.get('/features', featureController.getFeatures);

module.exports = router;