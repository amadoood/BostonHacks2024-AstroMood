import React, { useState } from 'react';
import Recommender from './recommender';
import MoodSelector from './mood_selector';
// import '../styles/css/home.css'

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood); // Set the selected mood
  };

  return (
    <div className="App">
      <header className="app">
        <h1>Spotify Recommender</h1>
        {selectedMood ? (
          <Recommender mood={selectedMood} />
        ) : (
          <MoodSelector onMoodSelect={handleMoodSelect} />
        )}
      </header>
    </div>
  );
}

export default Home;
