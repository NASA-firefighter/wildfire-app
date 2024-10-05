import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { GeoJSONData } from "./App";
import fireIconUrl from "./assets/fire-icon.png";

// Wildfire Map Component
export const WildfireMap: React.FC<{
  fireData: GeoJSONData | null;
  fireStyle: any;
  center: LatLngExpression;
}> = ({ fireData, fireStyle, center }) => {
  // Create a custom fire icon
  const fireIcon = L.icon({
    iconUrl: fireIconUrl, // Your fire icon URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (for correct positioning)
    popupAnchor: [0, -32], // Where the popup should open relative to the icon
  });

  return (
    <div>
      <h1>Wildfire Map</h1>
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {fireData &&
          fireData.features.map((feature, idx) => (
            <Marker
              key={idx}
              position={[
                feature.geometry.coordinates[1], // latitude
                feature.geometry.coordinates[0], // longitude
              ]}
              icon={fireIcon} // Use the custom fire icon
            >
              <Popup>
                <div>
                  <strong>Brightness:</strong> {feature.properties.brightness}
                  <br />
                  <strong>Confidence:</strong> {feature.properties.confidence}
                  <br />
                  <strong>Satellite:</strong> {feature.properties.satellite}
                  <br />
                  <strong>Date:</strong> {feature.properties.acq_date}
                  <br />
                  <strong>Instrument:</strong> {feature.properties.instrument}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
