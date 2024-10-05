// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import axios from "axios";
import Header from './Header'; // Import Header

// Define the GeoJSON data structure
interface FireFeature {
  type: string;
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

interface FireData {
  type: string;
  features: FireFeature[];
}

const App: React.FC = () => {
  const [fireData, setFireData] = useState<FireData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FireData>("http://localhost:3000/api/fires");
        setFireData(response.data);
      } catch (error) {
        console.error("Error fetching fire data:", error);
      }
    };

    fetchData();
  }, []);

  const fireStyle = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const center: LatLngExpression = [0, 0];

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/how-wildfire-affects" element={<HowWildfireAffects />} />
          <Route path="/wildfire-map" element={<WildfireMap fireData={fireData} fireStyle={fireStyle} center={center} />} />
          <Route path="/firefighter-game" element={<FirefighterGame />} />
        </Routes>
      </div>
    </Router>
  );
};

// Components for each route
const Overview: React.FC = () => <h2>Overview</h2>;
const HowWildfireAffects: React.FC = () => <h2>How Wildfire Affects Our System</h2>;
const FirefighterGame: React.FC = () => <h2>Firefighter Game</h2>;

const WildfireMap: React.FC<{ fireData: FireData | null; fireStyle: any; center: LatLngExpression; }> = ({ fireData, fireStyle, center }) => (
  <div>
    <h1>Wildfire Map</h1>
    <MapContainer center={center} zoom={2} style={{ height: "80vh", width: "100%" }}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      {fireData && (
        <GeoJSON
          data={fireData as any}
          pointToLayer={(feature, latlng) => {
            return L.circleMarker(latlng, fireStyle);
          }}
        />
      )}
    </MapContainer>
  </div>
);

export default App;
