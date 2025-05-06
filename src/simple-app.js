// simple-app.js
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Simple route to get features directly
app.get('/api/features', async (req, res) => {
  try {
    // Use your ArcGIS feature service URL
    const featureUrl = process.env.ARCGIS_FEATURE_SERVER_URL;
    
    // Add your token here if needed for testing
    const queryUrl = `${featureUrl}/query?where=1%3D1&outFields=*&f=json`;
    
    const response = await axios.get(queryUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching features:', error.message);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});