import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Globe from "react-globe.gl";
import * as THREE from "three"; // Import three.js for creating a starfield
import skyImage from './assets/sky.webp';
import soilImage from './assets/soil.webp';
import plantImage from './assets/plant.webp';
import oceanImage from './assets/ocean.webp';
import AkoImage from './assets/Ako.png';

export const FirefighterGame: React.FC = () => {
  const globeEl = useRef<any>(null); // Ref to control the globe
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // State to track which circle is clicked
  const navigate = useNavigate(); // Use useNavigate to navigate between pages

  // Function to create the starfield in the distant background
  const addStarfield = (scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    const distance = 4000; // Ensure stars are placed far away (distant background)
    for (let i = 0; i < 10000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars); // Add stars to the scene far in the background
  };

  useEffect(() => {
    if (globeEl.current) {
      const scene = globeEl.current.scene(); // Access the scene
      addStarfield(scene); // Add the starfield to the scene

      globeEl.current.controls().autoRotate = true; // Optional: auto-rotate
      globeEl.current.controls().autoRotateSpeed = 0.5; // Optional: slow rotation
    }
  }, []);

  // Function to handle click events on circles
  const handleCircleClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  // Navigate to a different page when the arrow is clicked
  const handleArrowClick = () => {
    navigate('/origin'); // Navigate to another page (make sure this route is set up)
  };

  // Inline styles for the 2D Circles with images and labels
  const circleContainerStyle = {
    width: '2cm',
    height: '2cm',
    position: 'absolute' as 'absolute', // Cast to handle TypeScript specificity
    border: '3px solid white',
    borderRadius: '50%',
    overflow: 'hidden', // Ensures that the image is clipped to a circular shape
    textAlign: 'center' as 'center',
    cursor: 'pointer', // Add pointer cursor to indicate clickable
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover', // Ensures the image fits inside the circle and is resized
    borderRadius: '50%', // Ensures the image itself is clipped into a circular shape
  };

  const labelStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 'bold' as 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Add text shadow for readability
  };

  // Style for the bottom-right Ako image
  const akoImageStyle = {
    position: 'fixed' as 'fixed',
    bottom: '20px', // Increased distance from the bottom
    right: '50px', // Increased distance from the right
    width: '200px', // Increased width
    height: '200px', // Increased height
  };

  // Style for the speech bubble (rounded rectangle)
  const speechBubbleStyle = {
    background: '#fff',
    width: '300px',
    boxShadow: '0 4px 12px 0px rgba(0, 0, 0, 0.18)',
    borderRadius: '16px',
    border: '1px solid #ECECEF',
    position: 'fixed' as 'fixed',
    bottom: '130px', // Position above Ako image
    right: '280px', // Move it to the left of Ako
    padding: '12px',
    textAlign: 'center' as 'center',
  };

  // Arrow below the speech bubble (on the right side)
  const arrowStyle = {
    content: '""',
    position: 'absolute' as 'absolute',
    top: '70%',
    right: '-20px', // Move the arrow to the right of the speech bubble
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '20px solid #fff', // Match the background of the speech bubble
  };

  const topicDescriptions: { [key: string]: string } = {
    기권: '기권(Atmosphere)은 지구를 둘러싼 대기층으로, 다양한 기상현상이 발생하는 곳입니다.',
    수권: '수권(Hydrosphere)은 지구의 물이 있는 모든 영역을 포함하며, 바다, 호수, 강이 해당됩니다.',
    지권: '지권(Geosphere)은 지구의 고체 부분을 말하며, 산, 흙, 암석을 포함합니다.',
    생물권: '생물권(Biosphere)은 모든 생물들이 살아가는 영역으로, 육지와 바다를 모두 포함합니다.',
  };

  // Rounded square arrow button style
  const arrowButtonStyle = {
    position: 'fixed' as 'fixed',
    top: '90px',
    right: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center' as 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: 'black' }}>
      {/* Globe component */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Bright Earth texture
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Surface bump texture
        backgroundColor="black"
        animateIn={true} // Animate globe on load
        onGlobeReady={() => {
          if (globeEl.current) {
            const scene = globeEl.current.scene(); // Ensure we access the scene after loading
            addStarfield(scene); // Add the stars to the scene
          }
        }}
      />

      {/* 2D Circles around the globe with inline styles and images */}
      {/* 기권 (Atmosphere) - Top */}
      <div onClick={() => handleCircleClick('기권')} style={{ ...circleContainerStyle, top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <img src={skyImage} alt="기권" style={imageStyle} />
        <div style={labelStyle}>기권</div>
      </div>

      {/* 수권 (Hydrosphere) - Bottom */}
      <div onClick={() => handleCircleClick('수권')} style={{ ...circleContainerStyle, bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <img src={oceanImage} alt="수권" style={imageStyle} />
        <div style={labelStyle}>수권</div>
      </div>

      {/* 지권 (Geosphere) - Left */}
      <div onClick={() => handleCircleClick('지권')} style={{ ...circleContainerStyle, top: '50%', left: '25%', transform: 'translateY(-50%)' }}>
        <img src={soilImage} alt="지권" style={imageStyle} />
        <div style={labelStyle}>지권</div>
      </div>

      {/* 생물권 (Biosphere) - Right */}
      <div onClick={() => handleCircleClick('생물권')} style={{ ...circleContainerStyle, top: '50%', right: '25%', transform: 'translateY(-50%)' }}>
        <img src={plantImage} alt="생물권" style={imageStyle} />
        <div style={labelStyle}>생물권</div>
      </div>

      {/* Fixed image at the bottom-right */}
      <img src={AkoImage} alt="Ako" style={akoImageStyle} />

      {/* Speech Bubble - Visible when a topic is selected */}
      {selectedTopic && (
        <div style={speechBubbleStyle}>
          <p>{topicDescriptions[selectedTopic]}</p>
          <div style={arrowStyle} />
        </div>
      )}

      {/* Rounded square arrow button to navigate to another page */}
      <div style={arrowButtonStyle} onClick={handleArrowClick}>
        →
      </div>
    </div>
  );
};
