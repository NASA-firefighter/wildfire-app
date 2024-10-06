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
      "• Air Pollution: Smoke and harmful substances released from fires degrade air quality and increase concentrations of fine particulate matter (PM2.5) and carbon dioxide (CO2).\n\n" +
      "• Temperature Changes: Fires raise surrounding temperatures, which can temporarily alter the local climate.\n\n" +
      "• Changes in Climate Patterns: Large-scale fires can shift local climate patterns, particularly affecting temperature and precipitation. In the long term, they may contribute to climate change.",
    Geosphere:
      "• Soil Loss: When fires destroy vegetation in the soil, erosion increases and soil fertility decreases.\n\n" +
      "• Nutrient Cycling: The loss of organic matter due to fires can disrupt nutrient cycling in the soil, which affects future plant growth.\n\n",
    Hydrosphere:
      "• Changes in Water Cycle: When vegetation in an area is destroyed by fire, evaporation and precipitation patterns can change, affecting the region's water sources.\n\n",
    Biosphere:
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
          <p>{explanations[selectedExplanation]}</p>
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
