import React from 'react';
import '../styles/css/mood_selector.css';

const MoodSelector = ({ onMoodSelect }) => {
  const handleMoodClick = (mood) => {
    onMoodSelect(mood); // Call the parent function to set the selected mood
  };

  return (
    <div className="container">
      <h2 id='basic'>What's your mood?</h2>
      <div className="modes">
        {[
          'happy', 'sad', 'irritable', 'calm', 
          'sleep'
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
