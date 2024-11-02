// server.js
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4444;  

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY] }));
app.use(passport.initialize());
app.use(passport.session());

// Handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Mood-Based Playlist Creator API!');
});

// Spotify authentication strategy
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: '/auth/spotify/callback',
},
    (accessToken, refreshToken, expires_in, profile, done) => {
        // Store user info in session
        return done(null, { accessToken, profile });
    }
));

// Serialization
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Auth Routes
app.get('/auth/spotify', passport.authenticate('spotify', { scope: ['user-read-private', 'user-read-email', 'user-top-read'] }));

app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to the frontend.
    res.redirect('http://localhost:3000');
});

// Fetch recommendations based on mood
app.get('/api/recommendations', async (req, res) => {
    const { accessToken } = req.user;
    const { mood } = req.query; // Get the mood from the query parameter

    // Set default parameters based on mood
    let seedGenres = 'pop';
    let targetEnergy = 0.5; // Default energy
    let targetValence = 0.5; // Default valence

    // Adjust parameters based on mood
    if (mood === 'happy') {
        targetEnergy = 0.8; // Higher energy for happy
        targetValence = 0.9; // More positive valence for happy
    } else if (mood === 'sad') {
        targetEnergy = 0.3; // Lower energy for sad
        targetValence = 0.2; // More negative valence for sad
    }



    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                seed_genres: seedGenres,
                target_energy: targetEnergy,
                target_valence: targetValence,
                limit: 10,
            },
        });
        res.json(response.data.tracks);
    } catch (error) {
        res.status(500).send('Error fetching recommendations');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

