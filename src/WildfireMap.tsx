/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import fireIconUrl from "./assets/fire-icon.png";
import axios from "axios";
import { getMonthsFrom2023 } from "./utils/get-month";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import wildfireCO2Data from "./data/wildfire-co2-data.json";
import co2EmissionData from "./data/annual-carbon-dioxide-emissions-with-coordinates.json"; // CO2 data
import { ChartOptions } from "chart.js";

Chart.register(...registerables);

// Define the available months
const months = getMonthsFrom2023();

const fireIcon = L.icon({
  iconUrl: fireIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

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

const getCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const getYearFromMonth = (month: string) => {
  return parseInt(month.split("-")[0]);
};

export const WildfireMap: React.FC<{
  center: LatLngExpression;
}> = ({ center }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
  const [fireData, setFireData] = useState<GeoJSONData | null>(null);

  const monthScrollRef = useRef<HTMLDivElement | null>(null);

  const handleMonthChange = (monthValue: string) => {
    setSelectedMonth(monthValue);

    const firstDateOfMonth = `${monthValue}-01`;
    fetchFireDataByDate(firstDateOfMonth);
  };

  const fetchFireDataByDate = async (date: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_FIRE_API_URL}/fires`,
        { params: { date } }
      );
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

  useEffect(() => {
    if (monthScrollRef.current) {
      monthScrollRef.current.scrollLeft = monthScrollRef.current.scrollWidth;
    }
    handleMonthChange(selectedMonth);
  }, [selectedMonth]);

  const chartData = {
    labels: wildfireCO2Data.map((data) => data.year),
    datasets: [
      {
        label: "CO2 Concentration (ppm)",
        data: wildfireCO2Data.map((data) => data.co2_concentration),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        yAxisID: "y1",
      },
      {
        label: "Number of Wildfires",
        data: wildfireCO2Data.map((data) => data.fires),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    scales: {
      y1: {
        type: "linear", // explicitly specify the type as 'linear'
        position: "left",
        title: {
          display: true,
          text: "CO2 Concentration (ppm)",
        },
      },
      y2: {
        type: "linear", // explicitly specify the type as 'linear'
        position: "right",
        title: {
          display: true,
          text: "Number of Wildfires",
        },
      },
    },
  };

  return (
    <div>
      <h1> &nbsp; &nbsp; See Wildfire Map</h1>

      <div
        ref={monthScrollRef}
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
          attribution="Tiles &copy; Esri"
        />
        {fireData &&
          fireData.features.map((feature, idx) => (
            <Marker
              key={idx}
              position={[
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ]}
              icon={fireIcon}
            >
              <Popup>
                <div>
                  <strong>Brightness:</strong> {feature.properties.brightness}
                  <br />
                  <strong>Confidence:</strong> {feature.properties.confidence}
                  <br />
                  <strong>Date:</strong> {feature.properties.acq_date}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* CO2 Emissions as circles */}
        {co2EmissionData.map((data: any, idx: number) =>
          data.year === getYearFromMonth(selectedMonth) ? ( // Check if emissions data exists
            <Circle
              key={idx}
              center={data.coordinates as LatLngExpression} // Valid coordinates
              radius={data.annual_carbon_dioxide_emissions / 3000} // Adjust size based on emissions
              color="blue"
              fillOpacity={0.5}
            >
              <Popup>
                <div>
                  <strong>{data.entity}</strong>
                  <br />
                  <strong>CO2 Emissions:</strong>{" "}
                  {data.annual_carbon_dioxide_emissions} metric tons
                  <br />
                  <strong>Year:</strong> {data.year}
                  <br />
                  <strong>Country: </strong> {data.entity}
                </div>
              </Popup>
            </Circle>
          ) : null
        )}
      </MapContainer>

      {/* CO2 Chart */}
      <div style={{ marginTop: "50px" }}>
        <h2>CO2 Levels vs Wildfire Activity</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
