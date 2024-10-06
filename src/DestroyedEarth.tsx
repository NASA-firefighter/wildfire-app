import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import Chart from "chart.js/auto";
import "./DestroyedEarth.css";
// import destroyedEarth from "./assets/destroyed-earth.png";

type FireMarker = {
  lat: number;
  lng: number;
  size: number;
};

export const DestroyedEarth: React.FC = () => {
  const globeEl = useRef<any>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Chart reference
  const chartInstance = useRef<Chart | null>(null); // Ref to store the Chart instance
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

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Data for all the years from 1980 to 2022
    const years = [
      "1980",
      "1981",
      "1982",
      "1983",
      "1984",
      "1985",
      "1986",
      "1987",
      "1988",
      "1989",
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
    ];

    const acresBurned = [
      5.26, 2.89, 1.59, 5.08, 2.27, 4.43, 3.25, 4.92, 7.44, 3.26, 5.45, 2.95,
      2.07, 2.32, 3.97, 1.84, 6.7, 2.86, 4.01, 3.69, 7.39, 3.56, 7.18, 4.86,
      6.18, 8.69, 9.87, 9.32, 5.16, 5.92, 3.42, 8.71, 9.32, 4.32, 3.6, 10.13,
      5.46, 10.03, 8.77, 4.65, 10.1, 7.13, 7.57,
    ];

    // Create the chart
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            {
              label: "Acres Burned in Wildland Fires (millions)",
              data: acresBurned,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            duration: 2000, // Animation duration
            easing: "easeInOutQuad", // Animation effect
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Acres Burned (millions)", // Y-axis title
              },
            },
            x: {
              title: {
                display: true,
                text: "Year", // X-axis title
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array so this only runs once

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
          {/* <img src={destroyedEarth} alt="Destroyed Earth" width={400} /> */}
          <canvas ref={chartRef} width={400} height={400}></canvas>{" "}
          {/* Chart will render here */}
          <button onClick={() => setShowOverlay(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
