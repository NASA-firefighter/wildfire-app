import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three"; // Import three.js for creating a starfield

export const HowWildfireAffects: React.FC = () => {
  const globeEl = useRef<any>(null); // Ref to control the globe

  // Function to create the starfield in the distant background
  const addStarfield = (scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    const distance = 4000; // Ensure stars are placed far away (distant background)
    for (let i = 0; i < 10000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
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

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
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
    </div>
  );
};

