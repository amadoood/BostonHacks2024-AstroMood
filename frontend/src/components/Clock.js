import React, { useEffect, useState } from 'react';
import '../styles/css/clock.css';

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    const interval = setInterval(updateClock, 60000); // Update every minute
    updateClock(); // Initial call
    return () => clearInterval(interval);
  }, []);

  return <div className="clock">{time}</div>;
};

export default Clock;
