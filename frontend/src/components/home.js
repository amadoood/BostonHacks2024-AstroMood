import React, { useState, useEffect } from 'react';
import Recommender from './recommender';
import MoodSelector from './mood_selector';
// import Settings from './settings';
// import Clock from './Clock';
import '../styles/css/home.css';

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  // const [showSettings, setShowSettings] = useState(false);
  // const [dayStart, setDayStart] = useState("08:00");
  // const [nightStart, setNightStart] = useState("18:00");

  const handleMoodSelect = (mood) => setSelectedMood(mood);

  // const toggleSettings = () => setShowSettings(!showSettings);

  // // Update background color based on time of day
  // const updateBackground = () => {
  //   const now = new Date();
  //   const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  //   const body = document.body;

  //   // Define day/night colors
  //   const colors = {
  //     dawn: "#FFA07A",   // light salmon for dawn
  //     daylight: "#87CEEB", // sky blue for daylight
  //     sunset: "#FFD700",   // golden yellow for sunset
  //     night: "#000000"    // full black for true night
  //   };

  //   let color;
  //   if (currentTime >= dayStart && currentTime < nightStart) {
  //     // Gradual sunrise into daylight
  //     color = colors.daylight;
  //   } else if (parseInt(currentTime.split(":")[0]) >= parseInt(nightStart.split(":")[0]) + 1) {
  //     // Full black for nighttime
  //     color = colors.night;
  //   } else {
  //     // Gradual sunset colors
  //     color = colors.dawn;
  //   }

  //   body.style.backgroundColor = color;
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(updateBackground, 60000); // Update every minute
  //   updateBackground(); // Initial call on component mount
  //   return () => clearInterval(intervalId);
  // }, [dayStart, nightStart]);

  return (
    <div className="App">
      {/* <Clock /> */}
      <header className="app">
        <h1 id="spacer"></h1>
        <h1>Spotify Recommender</h1>
        
        {selectedMood ? (
              <Recommender mood={selectedMood} />
            ) : (
              <MoodSelector onMoodSelect={handleMoodSelect} />
            )}

        {/* {showSettings ? (
          // Only show Settings component when showSettings is true
          <Settings dayStart={dayStart} nightStart={nightStart} setDayStart={setDayStart} setNightStart={setNightStart} />
        ) : (
          // Show the rest of the content when showSettings is false
          <>
            {selectedMood ? (
              <Recommender mood={selectedMood} />
            ) : (
              <MoodSelector onMoodSelect={handleMoodSelect} />
            )}
          </>
        )} */}
      </header>
    </div>
  );
}

export default Home;
