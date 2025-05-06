// minimal-server.js
const express = require('express');
const app = express();
const PORT = 3001;

// Just static routes, nothing fancy
app.get('/test', (req, res) => {
  res.send('Test route works');
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Minimal server running on port ${PORT}`);
});