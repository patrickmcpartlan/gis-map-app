// public/js/main.js
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';

// Initialize the map
const map = new Map({
  target: 'map',
  layers: [
    // Base map layer
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([-89.5, 40]), // Center of Illinois
    zoom: 7
  })
});

// Function to add an authentication button
function addAuthButton() {
  // Remove existing button if any
  const existingButton = document.querySelector('.auth-button');
  if (existingButton) {
    existingButton.remove();
  }
  
  const mapElement = document.getElementById('map');
  
  const authButton = document.createElement('button');
  authButton.textContent = 'Log in to ArcGIS';
  authButton.className = 'auth-button';
  authButton.onclick = () => {
    window.location.href = '/auth/login';
  };
  
  document.body.insertBefore(authButton, mapElement);
}

// Function to check authentication status
async function checkAuthStatus() {
  try {
    const response = await fetch('/auth/status');
    const data = await response.json();
    
    if (data.authenticated) {
      return true;
    } else {
      addAuthButton();
      return false;
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    addAuthButton();
    return false;
  }
}

// Function to fetch features from our API and add them to the map
async function loadFeatures() {
  try {
    // Check authentication first
    const isAuthenticated = await checkAuthStatus();
    
    if (!isAuthenticated) {
      console.log('Not authenticated');
      return;
    }
    
    console.log('Fetching features from API...');
    const response = await fetch('/api/features');
    
    if (response.status === 401) {
      // Unauthorized - need to authenticate
      console.log('Authentication required');
      addAuthButton();
      return;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Feature data received:', data);
    
    if (!data.features || !Array.isArray(data.features)) {
      console.error('Invalid feature data format:', data);
      return;
    }
    
    // Convert ArcGIS features to GeoJSON
    const features = {
      type: 'FeatureCollection',
      features: data.features.map(feature => {
        return {
          type: 'Feature',
          geometry: feature.geometry,
          properties: feature.attributes
        };
      })
    };
    
    // Create a vector source with the features
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(features, {
        featureProjection: 'EPSG:3857' // Web Mercator projection used by OpenLayers
      })
    });
    
    // Create a vector layer with the source
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    
    // Add the vector layer to the map
    map.addLayer(vectorLayer);
    
    // If there are features, fit the map view
    if (vectorSource.getFeatures().length > 0) {
      map.getView().fit(vectorSource.getExtent(), {
        padding: [50, 50, 50, 50],
        maxZoom: 14
      });
    }
  } catch (error) {
    console.error('Error loading features:', error);
    // If there's an error, we might need to authenticate
    addAuthButton();
  }
}

// Add some basic styling for the auth button
const style = document.createElement('style');
style.textContent = `
  .auth-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    padding: 10px 15px;
    background-color: #2b4b6f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .auth-button:hover {
    background-color: #1e3a58;
  }
`;
document.head.appendChild(style);

// Load features when the page loads
window.addEventListener('load', loadFeatures);