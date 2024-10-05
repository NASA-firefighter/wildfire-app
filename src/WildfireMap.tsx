import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import fireIconUrl from "./assets/fire-icon.png";
import axios from "axios";
import { getMonthsFrom2023 } from "./utils/get-month";

// Define the available months
const months = getMonthsFrom2023();

const fireIcon = L.icon({
  iconUrl: fireIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface GeoJSONFeature {
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
interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

const getCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-indexed
  return `${year}-${month}`;
};

export const WildfireMap: React.FC<{
  center: LatLngExpression;
}> = ({ center }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
  const [fireData, setFireData] = useState<GeoJSONData | null>(null);

  // Handle month change
  const handleMonthChange = (monthValue: string) => {
    setSelectedMonth(monthValue);

    // Construct the first day of the selected month
    const firstDateOfMonth = `${monthValue}-01`;

    // Send the first date of the month to the backend
    fetchFireDataByDate(firstDateOfMonth);
  };

  const fetchFireDataByDate = async (date: string) => {
    try {
      const response = await axios.get("http://localhost:8000/api/fires", {
        params: { date },
      });
      console.log("Fire Data Fetch successfully", response.data);

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

  // Fetch wildfire data from your backend for the selected month
  useEffect(() => {
    handleMonthChange(selectedMonth);
  }, [selectedMonth]);

  return (
    <div>
      <h1>Wildfire Map</h1>

      {/* Scrollable Month Selection */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        {months.map((month, index) => (
          <div
            key={index}
            onClick={() => handleMonthChange(month.value)}
            style={{
              display: "inline-block",
              padding: "10px",
              marginRight: "10px",
              backgroundColor:
                selectedMonth === month.value ? "#3f51b5" : "#f0f0f0",
              color: selectedMonth === month.value ? "#fff" : "#000",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "center",
              minWidth: "100px",
            }}
          >
            {month.label}
          </div>
        ))}
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {/* Render wildfire data markers */}
        {fireData &&
          fireData.features.map((feature, idx) => {
            const lat = feature.geometry.coordinates[1];
            const lng = feature.geometry.coordinates[0];
            return (
              <Marker key={idx} position={[lat, lng]} icon={fireIcon}>
                <Popup>
                  <div>
                    <strong>Brightness:</strong> {feature.properties.brightness}
                    <br />
                    <strong>Confidence:</strong> {feature.properties.confidence}
                    <br />
                    <strong>Acquisition Date:</strong>{" "}
                    {feature.properties.acq_date}
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};
