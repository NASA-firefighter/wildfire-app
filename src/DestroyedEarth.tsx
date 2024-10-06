import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import "./DestroyedEarth.css";
import destroyedEarth from "./assets/destroyed-earth.png";

type FireMarker = {
  lat: number;
  lng: number;
  size: number;
};

export const DestroyedEarth: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [showOverlay, setShowOverlay] = useState(true); // To control the overlay

  // Wildfire marker data
  const fireMarkers: FireMarker[] = [
    { lat: 37.7749, lng: -122.4194, size: 0.5 }, // California wildfire
    { lat: -33.8688, lng: 151.2093, size: 0.3 }, // Australia wildfire
    { lat: 55.7558, lng: 37.6173, size: 0.4 }, // Russia wildfire
  ];

  // Function to create the starfield in the distant background
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

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

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

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
        onGlobeReady={() => {
          if (globeEl.current) {
            const scene = globeEl.current.scene();
            addStarfield(scene); // Add the stars to the scene
          }
        }}
        objectsData={fireMarkers} // Use the fireMarkers data
        objectLat={(d: FireMarker) => d.lat}
        objectLng={(d: FireMarker) => d.lng}
        objectAltitude={0.01} // Controls altitude of markers
        objectThreeObject={(d: FireMarker) => {
          // Create custom marker geometry for wildfires
          const marker = new THREE.Mesh(
            new THREE.SphereGeometry(d.size, 6, 6),
            new THREE.MeshBasicMaterial({ color: "red" })
          );
          return marker;
        }}
      />
      {showOverlay && (
        <div className="overlay">
          <h2>The Earth Is in Trouble! 🌍</h2>
          <p>
            🌡️ Why?: Because of climate change, the Earth is getting hotter.
            Hotter land makes more wildfires 🌲🔥 happen.
          </p>
          <p>
            🏜️ What happens?: - Wildfires burn forests 🌳. - The air gets full
            of smoke 🌫️, making it harder for us and animals to breathe.
          </p>
          <p>
            🔄 What does that mean?: More wildfires release gases that make the
            Earth even hotter! It's like a circle of problems.
          </p>
          <p>
            How can we help?: We need to: - Plant more trees 🌲. - Stop
            polluting the air 🏭. - Take care of our planet 💚!
          </p>
          <img src={destroyedEarth} alt="Destroyed Earth" width={400} />
          <button onClick={() => setShowOverlay(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
