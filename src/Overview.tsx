import React, { useState, useEffect } from 'react';
import './Overview.css'; // Fire animations and styling are in this CSS file

interface Fire {
  id: number;
  x: number;
  y: number;
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

  // Fire spreading logic: New fire appears near an existing fire
  const spreadFire = (id: number, x: number, y: number) => {
    const newFire: Fire = {
      id: Date.now(),
      x: x + (Math.random() * 20 - 10), // Randomly within 10px radius
      y: y + (Math.random() * 20 - 10), // Randomly within 10px radius
    };
    setFires((prevFires) => [...prevFires, newFire]);
  };

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
          className="container"
          style={{
            left: fire.x,
            top: fire.y,
            position: 'absolute',
          }}
          onClick={() => extinguishFire(fire.id)} // Extinguish on click
          onAnimationIteration={() => spreadFire(fire.id, fire.x, fire.y)} // Spread fire with each animation cycle
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
