import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import pygmyRabbitIcon from "./assets/pygmy-rabbit-icon.png";
import frogIcon from "./assets/frog-icon.png";
import akikikiIcon from "./assets/akikiki-icon.png";
import koalaIcon from "./assets/koala-icon.png";
import orangutanIcon from "./assets/orangutan-icon.png";
import griffonVultureIcon from "./assets/griffon-vulture-icon.png";

interface AnimalData {
  name: string;
  position: LatLngExpression;
  description: string;
  icon: L.Icon;
  newsUrl: string;
}

export const EndangeredAnimals: React.FC = () => {
  const center: LatLngExpression = [20, 0]; // Global center
  const animals: AnimalData[] = [
    {
      name: "Pygmy Rabbit",
      position: [47.1164, -120.6739], // USA
      icon: L.icon({
        iconUrl: pygmyRabbitIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description: "Affected by wildfires in the U.S. from 2018-2020.",
      newsUrl:
        "https://columbiainsight.org/columbia-basin-pygmy-rabbits-are-facing-extinction/#:~:text=Climate%20change%2C%20wildfires%20to%20blame,wildfires%20have%20on%20shrubsteppe%20habitat.",
    },
    {
      name: "Southern California Yellow-legged Frog",
      position: [34.0522, -118.2437], // California
      icon: L.icon({
        iconUrl: frogIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description: "Threatened by wildfires in Southern California.",
      newsUrl:
        "https://www.latimes.com/environment/story/2024-09-15/endangered-frogs-threatened-by-california-wildfires",
    },
    {
      name: "Akikiki Bird",
      position: [20.7984, -156.3319], // Hawaii
      icon: L.icon({
        iconUrl: akikikiIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description: "Endangered by wildfires in Hawaii in 2023.",
      newsUrl:
        "https://www.nationalgeographic.com/animals/article/endangered-akikiki-bird-hawaii-maui-wildfires-extinction",
    },
    {
      name: "Koala",
      position: [-33.8688, 151.2093], // Australia (Sydney)
      icon: L.icon({
        iconUrl: koalaIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description:
        "Severely affected by wildfires from 2019-2020 in Australia.",
      newsUrl: "https://www.skyedaily.com/news/news_view.html?ID=97110",
    },
    {
      name: "Orangutan",
      position: [-2.3195, 111.6089], // Borneo, Southeast Asia
      icon: L.icon({
        iconUrl: orangutanIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description: "Suffered from forest fires in Southeast Asia.",
      newsUrl: "https://www.yna.co.kr/view/AKR20190918063000104?input=1195m",
    },
    {
      name: "Griffon Vulture",
      position: [39.0742, 21.8243], // Greece
      icon: L.icon({
        iconUrl: griffonVultureIcon,
        iconSize: [72, 72],
        iconAnchor: [36, 72],
        popupAnchor: [0, -72],
      }),
      description: "Endangered due to wildfires in Greece (2021, 2023-2024).",
      newsUrl:
        "https://www.wwf.gr/en/our_work/nature/terrestrial/endangered_species/",
    },
  ];

  return (
    <div>
      <h1>Endangered Animals</h1>
      <p>
        Learn about the endangered animals affected by wildfires and the
        importance of protecting their habitats.
      </p>
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {animals.map((animal, idx) => (
          <Marker key={idx} position={animal.position} icon={animal.icon}>
            <Popup>
              <h3>{animal.name}</h3>
              <p>{animal.description}</p>
              <a
                href={animal.newsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
