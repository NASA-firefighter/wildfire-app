// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Header from "./Header"; // Import Header
import { WildfireMap } from "./WildfireMap";
import { HowWildfireAffects } from "./HowWildfireAffects";
import { FirefighterGame } from "./FirefighterGame";
import { OtherPage } from "./OtherPage";
import { LatLngExpression } from "leaflet";
import Overview from "./Overview";
import { EndangeredAnimals } from "./EndangeredAnimals";
import { DestroyedEarth } from "./DestroyedEarth";
import { OurEffort } from "./OurEffort";

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
          <Route path="/other-page" element={<OtherPage />} />
          <Route path="/endangered-animals" element={<EndangeredAnimals />} />
          <Route path="/destroyed-earth" element={<DestroyedEarth />} />
          <Route path="/our-effort" element={<OurEffort />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
