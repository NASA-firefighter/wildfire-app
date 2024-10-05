import React, { useState, useEffect } from 'react';
import './Overview.css'; // Fire animations and styling are in this CSS file

interface Fire {
  id: number;
  x: number;
  y: number;
  spreadTimer?: NodeJS.Timeout; // Timer to control fire spread
}

const Overview: React.FC = () => {
  const [fires, setFires] = useState<Fire[]>([]);

  // Function to create a new fire at a random location
  const createFire = () => {
    const newFire: Fire = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    setFires((prevFires) => [...prevFires, newFire]);
  };

  // Function to spread fire every 2 seconds if not extinguished
  const spreadFire = (fire: Fire) => {
    const spreadTimer = setInterval(() => {
      const newFire: Fire = {
        id: Date.now(),
        x: fire.x + (Math.random() * 20 - 10), // Randomly within 10px radius
        y: fire.y + (Math.random() * 20 - 10), // Randomly within 10px radius
      };
      setFires((prevFires) => [...prevFires, newFire]);
    }, 2000); // Spread every 2 seconds

    fire.spreadTimer = spreadTimer;
  };

  // Start creating a new fire every 5 seconds
  useEffect(() => {
    const fireInterval = setInterval(createFire, 5000); // Create a new fire every 5 seconds
    return () => clearInterval(fireInterval); // Cleanup on unmount
  }, []);

  // Function to extinguish fire on click
  const extinguishFire = (id: number) => {
    setFires((prevFires) => {
      const fireToExtinguish = prevFires.find((fire) => fire.id === id);
      if (fireToExtinguish && fireToExtinguish.spreadTimer) {
        clearInterval(fireToExtinguish.spreadTimer); // Stop spreading
      }
      return prevFires.filter((fire) => fire.id !== id); // Remove the fire
    });
  };

  // Automatically spread each fire 2 seconds after it spawns
  useEffect(() => {
    if (fires.length > 0) {
      const latestFire = fires[fires.length - 1];
      spreadFire(latestFire);
    }
  }, [fires]); // Spread the fire whenever a new one is added

  return (
    <div className="overview-container">
      {/* Fires on the screen */}
      {fires.map((fire) => (
        <div
          key={fire.id}
          className="container"
          style={{
            left: fire.x,
            top: fire.y,
            position: 'absolute',
          }}
          onClick={() => extinguishFire(fire.id)} // Extinguish on click
        >
          <div className="red flame"></div>
          <div className="orange flame"></div>
          <div className="yellow flame"></div>
          <div className="white flame"></div>
          <div className="blue circle"></div>
          <div className="black circle"></div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
