// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Header from "./Header"; // Import Header
import { Overview } from "./Overview";
import { wildfire } from "./wildfire";
import { WildfireMap } from "./WildfireMap";
import { HowWildfireAffects } from "./HowWildfireAffects";
import { FirefighterGame } from "./FirefighterGame";
import { LatLngExpression } from "leaflet";

export const contentStyle: React.CSSProperties = {
  padding: "20px",
  margin: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    brightness: number;
    confidence: string;
    acq_date: string;
    satellite: string;
    instrument: string;
  };
}
export interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

const App: React.FC = () => {
  const center: LatLngExpression = [0, 0];

  const [fireData, setFireData] = useState<GeoJSONData | null>(null);

  // Fetch wildfire data from your Nest.js backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/fires");
        console.log("Fetched fire data:", response.data);
        // Transform the response data to GeoJSON format
        setFireData({
          type: "FeatureCollection",
          features: response.data.map((item: any) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                parseFloat(item.longitude),
                parseFloat(item.latitude),
              ],
            },
            properties: {
              brightness: item.bright_ti4,
              confidence: item.confidence,
              acq_date: item.acq_date,
              satellite: item.satellite,
              instrument: item.instrument,
            },
          })),
        });
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

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route
            path="/how-wildfire-affects"
            element={<wildfire />} // Use the newly created component
          />
          <Route
            path="/wildfire-map"
            element={
              <WildfireMap
                fireData={fireData}
                fireStyle={fireStyle}
                center={center}
              />
            }
          />
          <Route path="/firefighter-game" element={<FirefighterGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
