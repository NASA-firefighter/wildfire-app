// src/wildfire.tsx
import React from "react";
import Globe from "react-globe.gl";
import "./HowWildfireAffects.css"; // Create a CSS file for the background styling

export const HowWildfireAffects: React.FC = () => {
  return (
    <div className="space-background">
      <div className="globe-container">
        <Globe
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" // A beautiful night globe texture
          backgroundColor="rgba(0,0,0,0)" // To make the background transparent
          width={window.innerWidth * 0.8} // Responsive width
          height={window.innerHeight * 0.8} // Responsive height
        />
      </div>
    </div>
  );
};
