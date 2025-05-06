// src/routes/api.js
const express = require('express');
const router = express.Router();
const featuresController = require('../controllers/featuresController');

// Route to get features from ArcGIS feature service
router.get('/features', featuresController.getFeatures);

module.exports = router;