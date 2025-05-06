// src/routes/api.js
const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Route to get features from ArcGIS feature service
// Make sure this is a simple path pattern, not a full URL
router.get('/features', featureController.getFeatures);

// DO NOT use full URLs in route definitions like this:
// router.get('https://git.new/pathToRegexpError', ...) - THIS WOULD CAUSE THE ERROR

module.exports = router;