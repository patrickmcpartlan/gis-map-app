// src/services/featureService.js
const axios = require('axios');
require('dotenv').config();

const featureServerUrl = process.env.ARCGIS_FEATURE_SERVER_URL;

exports.getFeatures = async () => {
  try {
    // Build the URL for the query
    // The f=json parameter ensures we get a JSON response
    // outFields=* gets all fields
    const queryUrl = `${featureServerUrl}/query?where=1%3D1&outFields=*&f=json`;
    
    const response = await axios.get(queryUrl);
    return response.data;
  } catch (error) {
    console.error('Service error fetching features:', error);
    throw error;
  }
};