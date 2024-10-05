// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import axios from "axios";
import Header from "./Header"; // Import Header

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

const contentStyle: React.CSSProperties = {
  padding: "20px",
  margin: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const App: React.FC = () => {
  const [fireData, setFireData] = useState<FireData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FireData>(
          "http://localhost:3000/api/fires"
        );
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
          <Route
            path="/how-wildfire-affects"
            element={<HowWildfireAffects />}
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

// Components for each route
// src/App.tsx

const Overview: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>Overview</h2>
      <p>
        Wildfires are uncontrolled fires that spread rapidly, consuming
        vegetation, and can cause extensive damage to ecosystems, property, and
        human life. They can occur in forests, grasslands, and even urban areas.
        Understanding wildfires is crucial for implementing effective
        prevention, management, and recovery strategies.
      </p>
      <p>
        In this application, you can explore global wildfire data, learn about
        their effects on ecosystems and communities, view real-time maps of
        wildfires, and even engage with interactive content.
      </p>
    </div>
  );
};

const HowWildfireAffects: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>How Wildfire Affects Our System</h2>
      <h3>Ecological Impact</h3>
      <p>
        Wildfires can significantly alter ecosystems. While some species have
        adapted to thrive in fire-prone environments, many others suffer
        devastating losses. Fires can lead to habitat destruction and
        displacement of wildlife, but they can also stimulate new growth and
        maintain the health of certain ecosystems.
      </p>
      <h3>Climate Change</h3>
      <p>
        Wildfires contribute to climate change by releasing large amounts of
        carbon dioxide and other greenhouse gases into the atmosphere. This can
        exacerbate global warming, creating a feedback loop that leads to more
        frequent and intense wildfires.
      </p>
      <h3>Community Effects</h3>
      <p>
        Communities near wildfire-prone areas face risks to property, air
        quality, and public health. Evacuations and loss of infrastructure can
        disrupt lives and local economies. Awareness and preparation are
        essential for mitigating these risks.
      </p>
    </div>
  );
};

const FirefighterGame: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>Firefighter Game</h2>
      <p>
        Welcome to the Firefighter Game! In this interactive simulation, you
        will step into the shoes of a firefighter, tasked with battling
        wildfires and protecting your community.
      </p>
      <h3>Game Objective</h3>
      <p>
        Your mission is to strategically manage resources, coordinate
        firefighting efforts, and successfully extinguish fires while minimizing
        damage to the environment and ensuring the safety of local residents.
      </p>
      <h3>Gameplay Mechanics</h3>
      <ul>
        <li>Navigate through various terrains affected by wildfires.</li>
        <li>
          Make decisions on resource allocation and firefighting strategies.
        </li>
        <li>Respond to emergency situations and save lives!</li>
      </ul>
      <p>
        Are you ready to take on the challenge and become a hero in the fight
        against wildfires?
      </p>
    </div>
  );
};

const WildfireMap: React.FC<{
  fireData: FireData | null;
  fireStyle: any;
  center: LatLngExpression;
}> = ({ fireData, fireStyle, center }) => (
  <div>
    <h1>Wildfire Map</h1>
    <MapContainer
      center={center}
      zoom={2}
      style={{ height: "80vh", width: "100%" }}
    >
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
