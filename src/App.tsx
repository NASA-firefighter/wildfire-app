// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Header from "./Header"; // Import Header
import { WildfireMap } from "./WildfireMap";
import { HowWildfireAffects } from "./HowWildfireAffects";
import { FirefighterGame } from "./FirefighterGame";
import { LatLngExpression } from "leaflet";
import Overview from "./Overview";

export const contentStyle: React.CSSProperties = {
  padding: "20px",
  margin: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const App: React.FC = () => {
  const center: LatLngExpression = [0, 0];

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route
            path="/how-wildfire-affects"
            element={<HowWildfireAffects />}
          />
          <Route
            path="/wildfire-map"
            element={<WildfireMap center={center} />}
          />
          <Route path="/firefighter-game" element={<FirefighterGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
