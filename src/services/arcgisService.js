// src/services/arcgisService.js
const { queryFeatures } = require('@esri/arcgis-rest-feature-layer');
const sessionService = require('./sessionService');
require('dotenv').config();

const featureLayerUrl = process.env.ARCGIS_FEATURE_SERVER_URL;

// Function to query features from the feature layer
const getFeatures = async () => {
  try {
    // Check if we have an active session
    if (!sessionService.hasSession()) {
      throw new Error('No active session. Please authenticate first.');
    }
    
    const session = sessionService.getSession();
    
    // Query the feature layer
    const response = await queryFeatures({
      url: featureLayerUrl,
      where: '1=1',  // Get all features
      outFields: '*',  // Get all fields
      authentication: session
    });
    
    return response;
  } catch (error) {
    console.error('Error querying features:', error);
    throw error;
  }
};

module.exports = {
  getFeatures
};