import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet"; // Import Leaflet types
import axios from "axios";

// Define the GeoJSON data structure (optional but recommended)
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
  const [fireData, setFireData] = useState<FireData | null>(null); // Use a TypeScript type

  // Fetch wildfire data from your Nest.js backend (or NASA API)
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

  const center: LatLngExpression = [0, 0]; // Define center type

  return (
    <div>
      <h1>Global Wildfires Map</h1>
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
      >
        {/* Use Esri World Imagery for satellite map */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {fireData && (
          <GeoJSON
            data={fireData as any} // Type assertion due to GeoJSON requirements
            pointToLayer={(feature, latlng) => {
              return L.circleMarker(latlng, fireStyle);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default App;
