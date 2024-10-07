/* eslint-disable @typescript-eslint/no-unused-vars */
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pygmyRabbitIcon from "./assets/pygmy-rabbit-icon.png";
import frogIcon from "./assets/frog-icon.png";
import akikikiIcon from "./assets/akikiki-icon.png";
import koalaIcon from "./assets/koala-icon.png";
import orangutanIcon from "./assets/orangutan-icon.png";
import griffonVultureIcon from "./assets/griffon-vulture-icon.png";
import AkoImage from "./assets/Ako.png";

// CSS animations
import "./EndangeredAnimals.css";
import TypingAnimation from "./components/TypingAnimation";

interface AnimalData {
  name: string;
  position: LatLngExpression;
  description: string;
  icon: L.Icon;
  newsUrl: string;
}

export const EndangeredAnimals: React.FC = () => {
  const [activeAnimal, setActiveAnimal] = useState<string | null>(null); // Track which animal is "speaking"
  const center: LatLngExpression = [20, 0]; // Global center
  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const [showAkoMessage, setShowAkoMessage] = useState<boolean>(true); // State to control Ako's message
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate("/destroyed-earth");
  };

  const handleBackArrowClick = () => {
    navigate("/systems");
  };

  const arrowButtonStyle = {
    position: "fixed" as "fixed",
    top: "90px",
    right: "20px",
    width: "50px",
    height: "50px",
    backgroundColor: "#fff",
    border: "2px solid #000",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center" as "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.18)",
  };

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
      description:
        "Hi there! I'm a pygmy rabbit, one of the smallest rabbits in the world. I used to live happily in the United States, hiding in the sagebrush. But recently, wildfires burned my home and made it hard for me to find food. Now, I’m in real danger.",
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
      description:
        "Ribbit! I’m a Southern California yellow-legged frog, and I used to live in peaceful rivers and streams. But wildfires made my home unsafe. The water got dirty, and I have fewer places to live.",
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
      description:
        "Aloha! I’m an Akikiki bird from Hawaii. I love living in the beautiful forests here, but recently wildfires have destroyed the trees I live in.",
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
        "G’day mate! I’m a koala, and I live in Australia. I love eating eucalyptus leaves, but in 2019 and 2020, terrible wildfires burned down my forest.",
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
      description:
        "Hello! I’m an orangutan from the rainforests of Southeast Asia. Wildfires and deforestation have been destroying my forest.",
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
      description:
        "Hi! I’m a Griffon Vulture from Greece. Wildfires have burned the forests where I live and find food.",
      newsUrl:
        "https://www.wwf.gr/en/our_work/nature/terrestrial/endangered_species/",
    },
  ];

  // Handle click on Ako to show or hide the message
  const handleAkoClick = () => {
    setShowAkoMessage(!showAkoMessage);
  };

  return (
    <div>
      <h1>
        {" "}
        &nbsp; &nbsp; What endangered animals have been affected by wildfires?
      </h1>
      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {animals.map((animal, idx) => (
          <Marker
            key={idx}
            position={animal.position}
            icon={animal.icon}
            eventHandlers={{
              click: () => {
                setActiveAnimal(animal.name);
              },
            }}
          >
            <Popup
              className="popup"
              eventHandlers={{
                click: () => {
                  setActiveAnimal(null);
                  setShowReadMore(false);
                },
              }}
            >
              <h3>{animal.name}</h3>
              <TypingAnimation
                text={animal.description}
                onComplete={() => setShowReadMore(true)}
              />
              <div>
                {showReadMore && (
                  <a
                    href={animal.newsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Ako character */}
      <img
        src={AkoImage}
        alt="Ako the Koala"
        className="ako-image"
        style={{ cursor: "pointer", zIndex: 1000 }}
        onClick={handleAkoClick}
      />

      {/* Speech bubble or message for Ako */}
      {showAkoMessage && (
        <div className="speech-bubble">
          <TypingAnimation
            text={`I'm here to guide you through this map and help you
            learn about endangered animals. These animals are in danger because
            their homes are being destroyed by wildfires and other human
            activities. Click on an animal to learn more about how we can help!`}
            onComplete={() => {
              // wait for 3 seconds
              setTimeout(() => {
                setShowAkoMessage(false);
              }, 2000);
            }}
          />
          <div className="arrow" />
        </div>
      )}
      <div
        style={{
          position: "fixed",
          top: "90px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#fff",
          border: "2px solid #000",
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.18)",
          zIndex: 1000,
        }}
        onClick={handleArrowClick}
      >
        →
      </div>

      <div
        style={{
          position: "fixed",
          top: "90px",
          right: "80px",
          width: "50px",
          height: "50px",
          backgroundColor: "#fff",
          border: "2px solid #000",
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.18)",
          zIndex: 1000,
        }}
        onClick={handleBackArrowClick}
      >
        ←
      </div>
    </div>
  );
};
