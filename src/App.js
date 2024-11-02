// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [tracks, setTracks] = useState([]);
    
    useEffect(() => {
        // Check if user is authenticated
        axios.get('http://localhost:5000/auth/spotify')
            .then(() => {
                // Fetch recommendations
                fetchRecommendations();
            })
            .catch(err => console.error('Not authenticated:', err));
    }, []);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/recommendations', { withCredentials: true });
            setTracks(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <h1>Mood-Based Playlist Creator</h1>
            <button onClick={() => window.open('http://localhost:4444/auth/spotify', '_self')}>Login with Spotify</button>
            <h2>Recommended Tracks</h2>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artists[0].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
