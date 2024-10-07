/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Overview.css"; // Fire animations and styling are in this CSS file
import AkoImage from "./assets/Ako.png";

interface Fire {
  id: number;
  x: number;
  y: number;
}

const Overview: React.FC = () => {
  const [fires, setFires] = useState<Fire[]>([]);

  // Function to create a new fire at a random location
  const createRandomFire = () => {
    const newFire: Fire = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    setFires((prevFires) => [...prevFires, newFire]);
  };

  const arrowStyle = {
    content: '""',
    position: "absolute" as "absolute",
    top: "70%",
    right: "-20px", // Move the arrow to the right of the speech bubble
    transform: "translateY(-50%)",
    width: "0",
    height: "0",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: "20px solid #fff", // Match the background of the speech bubble
  };

  // Function to create a fire near an existing fire (within 10px)
  const createNearbyFire = (fire: Fire) => {
    const newFire: Fire = {
      id: Date.now(),
      x: fire.x + (Math.random() * 20 - 10), // Randomly within 10px radius
      y: fire.y + (Math.random() * 20 - 10), // Randomly within 10px radius
    };
    setFires((prevFires) => [...prevFires, newFire]);
  };

  const speechBubbleStyle = {
    background: "#fff",
    width: "300px",
    boxShadow: "0 4px 12px 0px rgba(0, 0, 0, 0.18)",
    borderRadius: "16px",
    border: "1px solid #ECECEF",
    position: "fixed" as "fixed",
    bottom: "130px", // Position above Ako image
    right: "280px", // Move it to the left of Ako
    padding: "12px",
    textAlign: "center" as "center",
  };

  // Ako image style: flipped and positioned at the top-left
  // Style for the bottom-right Ako image
  const akoImageStyle = {
    position: "fixed" as "fixed",
    bottom: "20px", // Increased distance from the bottom
    right: "50px", // Increased distance from the right
    width: "200px", // Increased width
    height: "200px", // Increased height
  };

  // Function to spawn a fire (either random or nearby)
  const spawnFire = () => {
    if (fires.length === 0) {
      // If there are no fires, create a random one
      createRandomFire();
    } else {
      // Otherwise, decide randomly whether to spawn a new random fire or near an existing one
      const shouldCreateNearby = Math.random() < 0.5; // 50% chance

      if (shouldCreateNearby) {
        const randomFire = fires[Math.floor(Math.random() * fires.length)]; // Choose a random existing fire
        createNearbyFire(randomFire); // Create a fire near it
      } else {
        createRandomFire(); // Otherwise, create a fire at a random location
      }
    }
  };

  // Start spawning a new fire every 1 second
  useEffect(() => {
    const fireInterval = setInterval(spawnFire, 500); // Spawn a fire every 1 second
    return () => clearInterval(fireInterval); // Cleanup on unmount
  }, [fires]); // Fires should spawn based on current state of fires

  // Function to extinguish fire on click
  const extinguishFire = (id: number) => {
    setFires((prevFires) => prevFires.filter((fire) => fire.id !== id)); // Remove the fire
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
            position: "absolute",
          }}
          onClick={() => extinguishFire(fire.id)} // Extinguish on click
        >
          <div className="red flame"></div>
          <div className="orange flame"></div>
          <div className="yellow flame"></div>
          <div className="white flame"></div>
        </div>
      ))}

      {/* Centered animated text */}
      <div className="text-animation">
        How Wildfires Impact The Earth's System
      </div>

      <img src={AkoImage} alt="Ako" style={akoImageStyle} />

      <div style={speechBubbleStyle}>
        <p>Click to put out the wildfire!</p>
        <div style={arrowStyle} />
      </div>
    </div>
  );
};

export default Overview;
