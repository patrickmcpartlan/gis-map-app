// debug.js
console.log('Starting debug...');
const express = require('express');
const app = express();

// Basic route
app.get('/test', (req, res) => {
  res.send('Test route');
});

// Start the server
app.listen(3001, () => {
  console.log('Debug server listening on port 3001');
});