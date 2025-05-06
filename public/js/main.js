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
    center: fromLonLat([-98.35, 39.50]), // Center of USA
    zoom: 4
  })
});

// Function to fetch features from our API and add them to the map
async function loadFeatures() {
  try {
    const response = await fetch('/api/features');
    const data = await response.json();
    
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
    
    // Fit the map view to the features
    map.getView().fit(vectorSource.getExtent(), {
      padding: [50, 50, 50, 50],
      maxZoom: 14
    });
  } catch (error) {
    console.error('Error loading features:', error);
  }
}

// Load features when the page loads
window.addEventListener('load', loadFeatures);