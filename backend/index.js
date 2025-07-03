require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;

app.use(cors());

// 1. APOD – Astronomy Picture of the Day
app.get('/api/apod', async (req, res) => {
  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

// 2. Mars Rover Photos
app.get('/api/mars', async (req, res) => {
  const { sol = 1000, rover = 'curiosity', camera = '' } = req.query;
  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Mars Rover data' });
  }
});

// 3. Asteroids – Near Earth Object Web Service (NeoWs)
app.get('/api/asteroids', async (req, res) => {
  const { start_date = '2025-06-20', end_date = '2025-06-25' } = req.query;
  try {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch asteroid data' });
  }
});

// 4. NASA Image and Video Library
app.get('/api/media', async (req, res) => {
  const { q = 'apollo' } = req.query;
  try {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NASA media' });
  }
});

// 5. EONET – Natural Earth Events
app.get('/api/eonet', async (req, res) => {
  try {
    const url = `https://eonet.gsfc.nasa.gov/api/v3/events`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch EONET data' });
  }
});

// 6. DONKI – Space Weather Events
app.get('/api/donki', async (req, res) => {
  const { startDate = '2025-06-01', endDate = '2025-06-25', type = 'CME' } = req.query;
  try {
    const url = `https://api.nasa.gov/DONKI/${type}?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch DONKI data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
