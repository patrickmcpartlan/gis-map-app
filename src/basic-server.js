// basic-server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
});