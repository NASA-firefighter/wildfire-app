import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Globe from "react-globe.gl";
import * as THREE from "three"; // Import three.js for creating a starfield
import skyImage from './assets/sky.webp';
import soilImage from './assets/soil.webp';
import plantImage from './assets/plant.webp';
import oceanImage from './assets/ocean.webp';
import AkoImage from './assets/Ako.png';

export const HowWildfireAffects: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const topicDescriptions: { [key: string]: string } = {
    Atmosphere: 'Atmosphere' +
        '\r\n' +
        'weathers rocks.' +
        'provides the oxygen and carbon dioxide needed for respiration and photosynthesis for living beings.' +
        'creates waves'
    ,
    Hydrosphere: '수권(Hydrosphere)은 지구의 물이 있는 모든 영역을 포함하며, 바다, 호수, 강이 해당됩니다.',
    Geosphere: '지권(Geosphere)은 지구의 고체 부분을 말하며, 산, 흙, 암석을 포함합니다.',
    Biosphere: '생물권(Biosphere)은 모든 생물들이 살아가는 영역으로, 육지와 바다를 모두 포함합니다.',
  };

  // Add starfield function
  const addStarfield = (scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices = [];
    const distance = 4000;

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
    scene.add(stars);
  };

  useEffect(() => {
    if (globeEl.current) {
      const scene = globeEl.current.scene();
      addStarfield(scene);

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const handleCircleClick = (topic: string) => {
    setSelectedTopic(topic); // Set the selected topic to display its description
  };

  const handleArrowClick = () => {
    navigate('/origin'); // Navigate to another page
  };

  // Inline styles for the 2D Circles with images and labels
  const circleContainerStyle = {
    width: '3cm',
    height: '3cm',
    position: 'absolute' as 'absolute',
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

  const akoImageStyle = {
    position: 'fixed' as 'fixed',
    bottom: '20px',
    right: '50px',
    width: '200px',
    height: '200px',
  };

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

  const speechBubbleStyle = {
    background: '#fff',
    width: '200px',
    boxShadow: '0 4px 12px 0px rgba(0, 0, 0, 0.18)',
    borderRadius: '16px',
    border: '1px solid #ECECEF',
    position: 'fixed' as 'fixed',
    bottom: '130px', // Position above Ako image
    right: '280px', // Move it to the left of Ako
    padding: '12px',
    textAlign: 'center' as 'center',
  };


    // Explanation circle style that appears in front of the globe
  const explanationCircleStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '300px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as 'center',
    fontSize: '1.2em',
    fontWeight: 'bold' as 'bold',
    color: '#000',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    zIndex: 5, // Positioned in front of the globe (lower z-index than the globe)
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

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: 'black' }}>
      {/* Globe component */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
      />

      {/* 2D Circles */}
      <div onClick={() => handleCircleClick('Atmosphere')} style={{ ...circleContainerStyle, top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <img src={skyImage} alt="Atmosphere" style={imageStyle} />
        <div style={labelStyle}>Atmosphere</div>
      </div>

      <div onClick={() => handleCircleClick('Hydrosphere')} style={{ ...circleContainerStyle, bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
        <img src={oceanImage} alt="Hydrosphere" style={imageStyle} />
        <div style={labelStyle}>Hydrosphere</div>
      </div>

      <div onClick={() => handleCircleClick('Geosphere')} style={{ ...circleContainerStyle, top: '50%', left: '25%', transform: 'translateY(-50%)' }}>
        <img src={soilImage} alt="Geosphere" style={imageStyle} />
        <div style={labelStyle}>Geosphere</div>
      </div>

      <div onClick={() => handleCircleClick('Biosphere')} style={{ ...circleContainerStyle, top: '50%', right: '25%', transform: 'translateY(-50%)' }}>
        <img src={plantImage} alt="Biosphere" style={imageStyle} />
        <div style={labelStyle}>Biosphere</div>
      </div>

      {/* Fixed Ako image */}
      <img src={AkoImage} alt="Ako" style={akoImageStyle} />

      {/* Explanation Circle in the center when a topic is selected */}
      {selectedTopic && (
        <div style={explanationCircleStyle}>
          <p>{topicDescriptions[selectedTopic]}</p>
        </div>
      )}



      {/* Arrow button for navigation */}
      <div style={arrowButtonStyle} onClick={handleArrowClick}>
        →
      </div>

      <div style={speechBubbleStyle}>
        <p>This is our Earth system. The Earth system interacts perfectly. </p>
        <div style={arrowStyle} />
      </div>

    </div>
  );
};
