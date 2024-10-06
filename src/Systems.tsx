import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import * as THREE from "three";
import AkoImage from './assets/Ako.png';
import FireImage from './assets/open-fire.gif';
import TreeImage from './assets/row of trees.png';

export const Systems: React.FC = () => {
  const globeEl = useRef<any>(null);
  const navigate = useNavigate();
  const [selectedExplanation, setSelectedExplanation] = useState<string>("기권");

  const explanations: { [key: string]: string } = {
    기권: "기권(Atmosphere)은 지구를 둘러싼 대기층으로, 다양한 기상현상이 발생하는 곳입니다.",
    지권: "지권(Geosphere)은 지구의 고체 부분을 말하며, 산, 흙, 암석을 포함합니다.",
    수권: "수권(Hydrosphere)은 지구의 물이 있는 모든 영역을 포함하며, 바다, 호수, 강이 해당됩니다.",
    생물권: "생물권(Biosphere)은 모든 생물들이 살아가는 영역으로, 육지와 바다를 모두 포함합니다."
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
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  };

  useEffect(() => {
    if (globeEl.current) {
      const scene = globeEl.current.scene();
      const camera = globeEl.current.camera();
      addStarfield(scene);
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  const handleArrowClick = () => {
    navigate('/systems');
  };

  const handleBackArrowClick = () => {
    navigate('/origin');
  };

  const explanationBoxStyle = {
    width: '900px',
    height: '450px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center' as 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
    marginRight: '20px',
  };

  const explanationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed' as 'fixed',
    bottom: '70px',
    left: '0',
    right: '0',
    zIndex: 10,
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed' as 'fixed',
    top: '150px',
    left: '0',
    right: '0',
    zIndex: 11,
    gap: '10px', // 버튼 간격을 10px로 설정
  };

  // Custom button styles
  const buttonStyle = {
    width: '130px',
    height: '40px',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px 25px',
    fontFamily: "'Lato', sans-serif",
    fontWeight: 500,
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative' as 'relative',
    display: 'inline-block' as 'inline-block',
    boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
    outline: 'none',
    border: 'none',
    backgroundColor: 'rgb(32,90,191)',
    backgroundImage: 'linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%)',
  };

  const buttonHoverStyle = {
    backgroundColor: 'rgb(143,172,223)',
    backgroundImage: 'linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%)',
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: 'black' }}>
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
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("기권")}
        >
          기권
        </button>
        <button
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("지권")}
        >
          지권
        </button>
        <button
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("수권")}
        >
          수권
        </button>
        <button
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => setSelectedExplanation("생물권")}
        >
          생물권
        </button>
      </div>

      {/* Explanation Box */}
      <div style={explanationContainerStyle}>
        <div style={explanationBoxStyle}>
          <p>{explanations[selectedExplanation]}</p>
        </div>
      </div>

      <img src={AkoImage} alt="Ako" style={{ position: 'fixed', top: '70px', left: '20px', width: '200px', height: '200px', transform: 'scaleX(-1)' }} />

      <div style={{ position: 'fixed', top: '90px', right: '20px', width: '50px', height: '50px', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)' }} onClick={handleArrowClick}>
        →
      </div>

      <div style={{ position: 'fixed', top: '90px', right: '80px', width: '50px', height: '50px', backgroundColor: '#fff', border: '2px solid #000', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)' }} onClick={handleBackArrowClick}>
        ←
      </div>

      <img src={TreeImage} alt="Row of Trees" style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100%', transform: 'scaleX(-1)' }} />
    </div>
  );
};
