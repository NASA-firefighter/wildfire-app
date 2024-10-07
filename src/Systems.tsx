import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import * as THREE from "three";
import AkoImage from "./assets/Ako.png";
import TreeImage from "./assets/row of trees.png";

export const Systems: React.FC = () => {
  const globeEl = useRef<any>(null);
  const navigate = useNavigate();
  const [selectedExplanation, setSelectedExplanation] =
    useState<string>("기권");

  const explanations: { [key: string]: string } = {
    Atmosphere:
      "Interactions between wildfire and Atmosphere\n\n" +
      "• Particulate matter: Wildfires release large amounts of particulate matter into the atmosphere, including smoke, soot, and ash. These particles can cause respiratory problems, cardiovascular disease, and other health issues.\n\n" +
      "• Air pollution: Wildfires also emit various air pollutants, such as carbon monoxide, nitrogen oxides, and volatile organic compounds. These pollutants can contribute to smog, acid rain, and ozone formation\n\n" +
      "• Greenhouse gas emissions: Wildfires release significant amounts of carbon dioxide and other greenhouse gases into the atmosphere. This contributes to global warming and climate change.\n\n" +
      "• Albedo effects: Wildfires can alter the Earth's albedo, which is its ability to reflect sunlight. Burned areas often have a darker surface, which absorbs more heat and contributes to warming.",
    Geosphere:
      "Interactions between wildfire and Geosphere\n\n" +
      "• Increased erosion: When wildfires strip vegetation from the landscape, the soil becomes more susceptible to erosion. Rainwater can easily wash away the exposed soil, leading to landslides and sedimentation in waterways.\n\n" +
      "• Nutrient loss: Fires can destroy organic matter in the soil, reducing its fertility and nutrient content. This can hinder plant growth and ecosystem recovery.",
    Hydrosphere:
      "Interaction between wildfire an Hydrosphere\n\n" +
      "Sedimentation: Wildfires can lead to increased soil erosion, which can result in sedimentation in waterways. This can reduce water clarity, impair aquatic ecosystems, and clog irrigation systems.\n\n" +
      "Contamination: Burned vegetation and ash can release pollutants into water sources, contaminating drinking water and harming aquatic life.\n\n" +
      "Nutrient loading: Wildfires can release nutrients from the soil into waterways, leading to eutrophication, or excessive nutrient enrichment, which can cause algal blooms and oxygen depletion.\n\n" +
      "Water runoff: Wildfires can alter the landscape, making it more susceptible to water runoff. This can lead to increased flooding and erosion.\n\n" +
      "Water retention: Burned areas may have reduced vegetation cover, which can affect water retention in the soil. This can lead to decreased groundwater recharge and reduced streamflow.\n\n",
    Biosphere:
      "Interaction between wildfire an Biosphere\n\n" +
      "• Destruction of Habitats: Fires destroy habitats for plants and animals, leading to a decrease in biodiversity. Many species suffer direct damage or lose their homes.\n\n" +
      "• Recovery Process: After a fire, ecosystems undergo a recovery process, which can restore biodiversity over time. However, this process can take decades.\n\n" +
      "• Endangered Species: When habitats are destroyed by wildfires, the survival chances of endangered species are further diminished.\n",
  };

  const addStarfield = (scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices = [];
    const distance = 4000;
    for (let i = 0; i < 10000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  };

  useEffect(() => {
    if (globeEl.current) {
      const scene = globeEl.current.scene();
      addStarfield(scene);
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const handleArrowClick = () => {
    navigate("/endangered-animals");
  };

  const handleBackArrowClick = () => {
    navigate("/origin");
  };

  // 스타일 수정: 글씨 크기를 키우고 줄바꿈 처리
  const explanationBoxStyle = {
    width: "900px",
    height: "450px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "left" as "left", // 왼쪽 정렬로 변경
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.18)",
    marginRight: "20px",
    fontSize: "1.2em", // 글씨 크기 키움
    whiteSpace: "pre-wrap" as "pre-wrap", // 줄바꿈 적용
  };

  const explanationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    position: "fixed" as "fixed",
    bottom: "70px",
    left: "0",
    right: "0",
    zIndex: 10,
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    position: "fixed" as "fixed",
    top: "150px",
    left: "0",
    right: "0",
    zIndex: 11,
    gap: "10px", // 버튼 간격을 10px로 설정
  };

  const speechBubbleStyle = {
    background: "#fff",
    width: "150px",
    boxShadow: "0 4px 12px 0px rgba(0, 0, 0, 0.18)",
    borderRadius: "16px",
    border: "1px solid #ECECEF",
    position: "fixed" as "fixed",
    top: "100px",
    left: "230px",
    padding: "12px",
    textAlign: "center" as "center",
  };

  const arrowStyle = {
    content: '""',
    position: "absolute" as "absolute",
    top: "50%",
    left: "-20px",
    transform: "translateY(-50%)",
    width: "0",
    height: "0",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: "20px solid #fff",
  };

  // Custom button styles
  const buttonStyle = {
    width: "130px",
    height: "40px",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px 25px",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 500,
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative" as "relative",
    display: "inline-block" as "inline-block",
    boxShadow:
      "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    outline: "none",
    border: "none",
    backgroundColor: "rgb(32,90,191)",
    backgroundImage:
      "linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%)",
  };

  const buttonHoverStyle = {
    backgroundColor: "rgb(143,172,223)",
    backgroundImage:
      "linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%)",
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="black"
        animateIn={true}
      />

      {/* Buttons for topic selection */}
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("Atmosphere")}
        >
          Atmosphere
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("Geosphere")}
        >
          Geosphere
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("Hydrosphere")}
        >
          Hydrosphere
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("Biosphere")}
        >
          Biosphere
        </button>
      </div>

      {/* Explanation Box */}
      <div style={explanationContainerStyle}>
        <div style={explanationBoxStyle}>
          <p style={{ margin: "12px" }}>{explanations[selectedExplanation]}</p>
        </div>
      </div>

      <img
        src={AkoImage}
        alt="Ako"
        style={{
          position: "fixed",
          top: "70px",
          left: "20px",
          width: "200px",
          height: "200px",
          transform: "scaleX(-1)",
        }}
      />

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
        }}
        onClick={handleBackArrowClick}
      >
        ←
      </div>

      <div style={speechBubbleStyle}>
        <p> How Does the Earth System Change When a Wildfire Occurs? </p>
        <div style={arrowStyle} />
      </div>

      <img
        src={TreeImage}
        alt="Row of Trees"
        style={{
          position: "fixed",
          bottom: "0px",
          left: "0px",
          width: "100%",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
};
