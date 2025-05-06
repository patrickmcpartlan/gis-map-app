// src/controllers/authController.js
const sessionService = require('../services/sessionService');

// Function to handle the OAuth callback
exports.handleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).send('Authorization code missing');
    }
    
    // Create a session from the code
    await sessionService.createSession(code);
    
    // Redirect to the main page
    res.redirect('/');
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Authentication failed: ' + error.message);
  }
};

// Function to initiate the OAuth flow
exports.initiateOAuth = (req, res) => {
  const clientId = process.env.ARCGIS_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  
  // Redirect to ArcGIS Online login page
  const authUrl = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  res.redirect(authUrl);
};

// Function to check authentication status
exports.checkAuth = (req, res) => {
  res.json({
    authenticated: sessionService.hasSession()
  });
};