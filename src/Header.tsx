// src/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <nav>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/">Overview</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/how-wildfire-affects">How Wildfire Affects Our System</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/wildfire-map">Wildfire Map</Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/firefighter-game">Firefighter Game</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#282c34',
  padding: '10px',
  color: 'white',
};

const navListStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
};

const navItemStyle: React.CSSProperties = {
  margin: '0 15px',
};

export default Header;
