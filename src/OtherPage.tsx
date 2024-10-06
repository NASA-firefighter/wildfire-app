import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Globe from "react-globe.gl";
import * as THREE from "three"; // Import three.js for creating a starfield
import skyImage from './assets/sky.webp';
import soilImage from './assets/soil.webp';
import plantImage from './assets/plant.webp';
import oceanImage from './assets/ocean.webp';
import AkoImage from './assets/Ako.png';
import FireImage from './assets/open-fire.gif';
import TreeImage from './assets/row of trees.png'; // Import tree image


export const OtherPage: React.FC = () => {
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
      const camera = globeEl.current.camera(); // Access the camera
      addStarfield(scene); // Add the starfield to the scene

      globeEl.current.controls().autoRotate = true; // Optional: auto-rotate
      globeEl.current.controls().autoRotateSpeed = 0.5; // Optional: slow rotation
    }
  }, []);

  // Function to handle click events on circles
  const handleCircleClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  // Navigate to the next page
  const handleArrowClick = () => {
    navigate('/other-page'); // Navigate to another page (make sure this route is set up)
  };

  // Navigate to the previous page
  const handleBackArrowClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Inline styles for the 2D Circles with images and labels
  const circleContainerStyle = {
    width: '2cm',
    height: '2cm',
    position: 'absolute' as 'absolute',
    border: '3px solid white',
    borderRadius: '50%',
    overflow: 'hidden',
    textAlign: 'center' as 'center',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    borderRadius: '50%',
  };

  const labelStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 'bold' as 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  };

  // Ako image style: flipped and positioned at the top-right
  const akoImageStyle = {
    position: 'fixed' as 'fixed',
    top: '70px', // Adjusted to top
    left: '20px', // Right aligned
    width: '200px',
    height: '200px',
    transform: 'scaleX(-1)', // Flip horizontally
  };

  const speechBubbleStyle = {
    background: '#fff',
    width: '300px',
    boxShadow: '0 4px 12px 0px rgba(0, 0, 0, 0.18)',
    borderRadius: '16px',
    border: '1px solid #ECECEF',
    position: 'fixed' as 'fixed',
    bottom: '130px',
    right: '280px',
    padding: '12px',
    textAlign: 'center' as 'center',
  };

  const arrowStyle = {
    content: '""',
    position: 'absolute' as 'absolute',
    top: '70%',
    right: '-20px',
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '20px solid #fff',
  };

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

  // Style for back arrow button
  const backArrowButtonStyle = {
    ...arrowButtonStyle,
    right: '80px', // Position it to the left of the forward arrow
  };

  // Style for the tree image at the bottom
  const treeImageStyle = {
    position: 'fixed' as 'fixed',
    top: '70px', // Adjusted to top
    left: '0px', // Right aligned
    width: '100%',
    height: '100%',
    transform: 'scaleX(-1)', // Flip horizontally

  };

  const fireImageStyle = {
    position: 'fixed' as 'fixed',
    top: '70px', // Adjusted to top
    left: '0px', // Right aligned
    width: '100%',
    height: '100%',
    transform: 'scaleX(-1)', // Flip horizontally

  };


  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: 'black' }}>
      {/* Globe component */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
        onGlobeReady={() => {
          if (globeEl.current) {
            const scene = globeEl.current.scene();
            const camera = globeEl.current.camera();
            addStarfield(scene);
          }
        }}
      />

      {/* Flipped Ako image at the top-right */}
      <img src={AkoImage} alt="Ako" style={akoImageStyle} />


      {/* Fire effect rendered on top of the tree image */}
      <img src={FireImage} alt="open-fire" style={fireImageStyle} />

      {/* Speech Bubble - Visible when a topic is selected */}
      {selectedTopic && (
        <div style={speechBubbleStyle}>
          <div style={arrowStyle} />
        </div>
      )}


      {/* Forward arrow button */}
      <div style={arrowButtonStyle} onClick={handleArrowClick}>
        →
      </div>


      {/* Back arrow button */}
      <div style={backArrowButtonStyle} onClick={handleBackArrowClick}>
        ←
      </div>

      {/* Tree image at the bottom */}
      <img src={TreeImage} alt="Row of Trees" style={treeImageStyle} />
    </div>
  );
};
