import React from 'react';
import '../styles/css/mood_selector.css';

const MoodSelector = ({ onMoodSelect }) => {
  const handleMoodClick = (mood) => {
    onMoodSelect(mood); // Call the parent function to set the selected mood
  };

  return (
    <div className="container">
      <h1>What is your mood?</h1>
      <div className="modes">
        {[
          'energize', 'calm', 'focus', 'sleep', 
          'happy', 'homebound', 'reflective', 
          'adventure', 'connection', 'meditative'
        ].map((mood) => (
          <button 
            key={mood} 
            className="mode-button" 
            id={mood} 
            onClick={() => handleMoodClick(mood)}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)} {/* Capitalize first letter */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
