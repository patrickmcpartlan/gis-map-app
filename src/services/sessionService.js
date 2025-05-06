// src/services/sessionService.js
const { UserSession } = require('@esri/arcgis-rest-auth');
require('dotenv').config();

// Store the user session
let session = null;

// Function to create a new session
const createSession = async (code) => {
  try {
    // Create a session from an authorization code
    session = await UserSession.exchangeAuthorizationCode({
      clientId: process.env.ARCGIS_CLIENT_ID,
      clientSecret: process.env.ARCGIS_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      code: code
    });
    
    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

// Function to get the current session
const getSession = () => {
  return session;
};

// Function to check if we have an active session
const hasSession = () => {
  return session !== null;
};

module.exports = {
  createSession,
  getSession,
  hasSession
};