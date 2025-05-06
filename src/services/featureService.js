// src/services/featureService.js
const axios = require('axios');
require('dotenv').config();

// Make sure this variable actually gets populated
const featureServerUrl = process.env.ARCGIS_FEATURE_SERVER_URL;
console.log('ArcGIS URL:', featureServerUrl); // Add this for debugging

exports.getFeatures = async () => {
  try {
    if (!featureServerUrl) {
      throw new Error('ArcGIS Feature Server URL is not defined in environment variables');
    }
    
    // Build the URL for the query
    const queryUrl = `${featureServerUrl}/query?where=1%3D1&outFields=*&f=json`;
    console.log('Making request to:', queryUrl); // Add this for debugging
    
    const response = await axios.get(queryUrl);
    return response.data;
  } catch (error) {
    console.error('Service error fetching features:', error.message);
    throw error;
  }
};