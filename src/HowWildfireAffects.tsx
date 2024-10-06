import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import * as THREE from "three";
import skyImage from './assets/sky.webp';
import soilImage from './assets/soil.webp';
import plantImage from './assets/plant.webp';
import oceanImage from './assets/ocean.webp';
import AkoImage from './assets/Ako.png';

export const HowWildfireAffects: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const topicData: { [key: string]: { title: string; description: string } } = {
    Atmosphere: {
      title: 'Atmosphere',
      description:
        '• Weathers rocks.\r\n' +
        '• Provides the oxygen and carbon dioxide needed for respiration and photosynthesis for living beings.\r\n' +
        '• Creates waves.',
    },
    Hydrosphere: {
      title: 'Hydrosphere',
      description:
          '• Supplies water and provides habitats for living beings.\r\n' +
        '• Generates typhoons.\r\n' +
        '• Creates beautiful landscapes.',
    },
    Geosphere: {
      title: 'Geosphere',
      description:
        '• Provides land where living beings can thrive.\r\n' +
        '• Erupts volcanic ash and gases, causing changes in Earth\'s temperature.\r\n' +
        '• Melts and moves materials into the hydrosphere.',
    },
    Biosphere: {
      title: 'Biosphere',
      description:
          '• Supplies oxygen to the hydrosphere.\r\n' +
        '• Maintains the composition of the atmosphere through photosynthesis and respiration.\r\n' +
        '• Alters the Earth\'s surface.',
    },
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
    setSelectedTopic(topic);
  };

  const handleArrowClick = () => {
    navigate('/origin');
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
    right: '-20px',
    transform: 'translateY(-50%)',
    width: '0',
    height: '0',
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '20px solid #fff',
  };

  const speechBubbleStyle = {
    background: '#fff',
    width: '200px',
    boxShadow: '0 4px 12px 0px rgba(0, 0, 0, 0.18)',
    borderRadius: '16px',
    border: '1px solid #ECECEF',
    position: 'fixed' as 'fixed',
    bottom: '130px',
    right: '280px',
    padding: '12px',
    textAlign: 'center' as 'center',
  };

  // Explanation circle style
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
    flexDirection: 'column' as 'column',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    zIndex: 5,
  };

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold' as 'bold',
    color: 'blue',
    marginBottom: '10px', // Adds space between title and description
  };

  const descriptionStyle = {
    fontSize: '1.0em',
    whiteSpace: 'pre-line' as 'pre-line', // Enables line breaks in the description
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
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
      />

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

      <img src={AkoImage} alt="Ako" style={akoImageStyle} />

      {selectedTopic && (
        <div style={explanationCircleStyle}>
          <div style={titleStyle}>{topicData[selectedTopic].title}</div>
          <div style={descriptionStyle}>{topicData[selectedTopic].description}</div>
        </div>
      )}

      <div style={arrowButtonStyle} onClick={handleArrowClick}>
        →
      </div>

      <div style={speechBubbleStyle}>
        <p> This is our Earth system.
        The Earth system interacts perfectly.
        This is a truly beautiful balance. </p>
        <div style={arrowStyle} />
      </div>
    </div>
  );
};
