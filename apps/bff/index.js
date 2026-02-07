const express = require('express');
const axios = require('axios'); // We'll use axios to make the HTTP call
const app = express();
const port = 3000;

// This is where we use the environment variable!
// We'll default to localhost if the variable isn't set.
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

app.get('/', async (req, res) => {
  try {
    // The Frontend calls the Backend Service
    const response = await axios.get(BACKEND_URL);
    res.send(`
      <h1>K8s Learning App</h1>
      <p>Frontend reached Backend at: <strong>${BACKEND_URL}</strong></p>
      <p>Backend says: <em>${response.data}</em></p>
    `);
  } catch (err) {
    res.status(500).send(`Frontend failed to reach Backend at ${BACKEND_URL}: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Frontend listening at http://localhost:${port}`);
});