import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="link">
              Overview
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/how-wildfire-affects" className="link">
              How Wildfire Affects Our System
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wildfire-map" className="link">
              Wildfire Map
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/firefighter-game" className="link">
              Firefighter Game
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/endangered-animals" className="link">
              Endangered Animals
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/destroyed-earth" className="link">
              Destroyed Earth
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
