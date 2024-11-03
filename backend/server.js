const express = require('express');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const PORT =  5555;
// process.env.PORT ||
app.use(express.json());

// Spotify API credentials
const client_id = process.env.SPOTIFY_CLIENT_ID; 
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; 
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

// Function to get an authentication token
const getAuth = async () => {
  const token_url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(token_url, data, {
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};

// Endpoint to get mood-based song recommendations
app.post('/api/songs', async (req, res) => {
  console.log(req.body)
  const { mood } = req.body;
  const token = await getAuth();

  let seedGenre = 'pop';
  let targetEnergy = 0.5;
  let targetValence = 0.5;

  switch (mood) {
    case 'happy':
      seedGenre = 'pop';
      targetEnergy = 0.8;
      targetValence = 0.9;
      break;
    case 'sad':
      seedGenre = 'emo';
      targetEnergy = 0.3;
      targetValence = 0.2;
      break;
    case 'calm':
      seedGenre = 'ambient';
      targetEnergy = 0.1;
      targetValence = 0.5;
      break;
    case 'irritable':
      seedGenre = 'heavy-metal';
      targetEnergy = 0.7;
      targetValence = 0.7;
      break;
    case 'sleep':
      seedGenre = 'ambient';
      targetEnergy = 0.1;
      targetValence = 0.1;
      break;
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        seed_genres: seedGenre,
        target_energy: targetEnergy,
        target_valence: targetValence,
        limit: 10
      }
    });

    const songs = response.data.tracks.map(track => ({
      name: track.name,
      url: track.external_urls.spotify
    }));

    res.json(songs);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: 'Failed to fetch song recommendations' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});