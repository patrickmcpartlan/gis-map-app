// src/controllers/featuresController.js
const arcgisService = require('../services/arcgisService');
const sessionService = require('../services/sessionService');

// Function to get features
exports.getFeatures = async (req, res) => {
  try {
    // Check if we have an active session
    if (!sessionService.hasSession()) {
      return res.status(401).json({
        error: 'Not authenticated',
        message: 'Please authenticate first'
      });
    }
    
    // Get features from the service
    const features = await arcgisService.getFeatures();
    
    res.json(features);
  } catch (error) {
    console.error('Error getting features:', error);
    res.status(500).json({
      error: 'Failed to get features',
      message: error.message
    });
  }
};