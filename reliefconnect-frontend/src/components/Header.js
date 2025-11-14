import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // ✅ Import the header styling

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">🌍 ReliefConnect</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/request">Request Help</Link>
        <Link to="/offer">Offer Help</Link>
        <Link to="/map">Relief Map</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
