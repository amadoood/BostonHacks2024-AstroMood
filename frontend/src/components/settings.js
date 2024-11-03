import React from 'react';
import '../styles/css/settings.css';
import Clock from './Clock';

const Settings = ({ dayStart, nightStart, setDayStart, setNightStart }) => {
    function toggleMenu() {
        const menuContainer = document.getElementById('menuContainer');
        menuContainer.classList.toggle('expanded');
      }
    return (
    <div>
        <Clock />
        <div className="menu-container">
        
        <h1 id='settings'>Settings</h1>
        <h3>Set Day and Night Cycles</h3>
        <label>Day Start Time:</label>
        <input type="time" value={dayStart} onChange={(e) => setDayStart(e.target.value)} />
        <label>Night Start Time:</label>
        <input type="time" value={nightStart} onChange={(e) => setNightStart(e.target.value)} />
        <button onClick={() => alert(`Day starts at ${dayStart} and night starts at ${nightStart}.`)}>Update Cycles</button>
        </div>
    </div>
  );
};

export default Settings;
