import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles/css/recommender.css'

function Recommender({ mood }) {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await axios.post('http://localhost:5555/api/songs', { mood });
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load recommendations");
      }
    }

    fetchRecommendations();
  }, [mood]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Recommended Songs for {mood}</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index}>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                {song.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommender;
