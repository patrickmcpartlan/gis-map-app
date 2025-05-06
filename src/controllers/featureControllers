// src/controllers/featureController.js
const featureService = require('../services/featureService');

exports.getFeatures = async (req, res) => {
  try {
    const features = await featureService.getFeatures();
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
};