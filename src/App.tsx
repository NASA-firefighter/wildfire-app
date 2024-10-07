// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Header from "./Header"; // Import Header
import { WildfireMap } from "./WildfireMap";
import { Test } from "./test";
import { HowWildfireAffects } from "./HowWildfireAffects";
import { Origin } from "./Origin";
import { Systems } from "./Systems";
import { LatLngExpression } from "leaflet";
import Overview from "./Overview";
import { EndangeredAnimals } from "./EndangeredAnimals";
import { DestroyedEarth } from "./DestroyedEarth";
import { OurEffort } from "./OurEffort";
import { Team } from "./Team";
import { References } from "./References";

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
          <Route path="/firefighter-game" element={<Test />} />
          <Route path="/origin" element={<Origin />} />
          <Route path="/team" element={<Team />} />
          <Route path="/references" element={<References />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/endangered-animals" element={<EndangeredAnimals />} />
          <Route path="/destroyed-earth" element={<DestroyedEarth />} />
          <Route path="/our-effort" element={<OurEffort />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
