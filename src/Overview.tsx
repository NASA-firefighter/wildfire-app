import React, { useState, useEffect } from 'react';
import './Overview.css'; // Create this CSS file for fire styling

interface Fire {
  id: number;
  x: number;
  y: number;
  size: number;
}

const Overview: React.FC = () => {
  const [fires, setFires] = useState<Fire[]>([]);

  // Function to create a new fire at a random location
  const createFire = () => {
    const newFire: Fire = {
      id: Date.now(), // unique ID for each fire
      x: Math.random() * window.innerWidth, // random x position
      y: Math.random() * window.innerHeight, // random y position
      size: 30, // initial size
    };
    setFires((prevFires) => [...prevFires, newFire]);
  };

  // Fire expansion logic
  useEffect(() => {
    const interval = setInterval(() => {
      setFires((prevFires) =>
        prevFires.map((fire) => ({
          ...fire,
          size: fire.size < 200 ? fire.size + 10 : fire.size, // grows until size 200
        }))
      );
    }, 500); // Expand every 500ms
    return () => clearInterval(interval);
  }, []);

  // Every 5 seconds, create a new fire
  useEffect(() => {
    const interval = setInterval(createFire, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to extinguish fire on click
  const extinguishFire = (id: number) => {
    setFires((prevFires) => prevFires.filter((fire) => fire.id !== id));
  };

  return (
    <div className="overview-container">
      {/* Fires on the screen */}
      {fires.map((fire) => (
        <div
          key={fire.id}
          className="fire"
          style={{
            left: fire.x,
            top: fire.y,
            width: fire.size,
            height: fire.size,
          }}
          onClick={() => extinguishFire(fire.id)} // Extinguish on click
        ></div>
      ))}
    </div>
  );
};

export default Overview;
