import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import CONFIG from "../config";
import { getToken, clearToken } from "../utils/auth";
import "../Home.css";

const socketUrl = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const backgrounds = [
    "/images/flood.webp",
    "/images/fire.webp",
    "/images/drought.webp",
    "/images/lightning.webp",
  ];

  // Preload background images
  useEffect(() => {
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Fetch + socket connection
  useEffect(() => {
    fetch(`${CONFIG.API_BASE}/requests`)
      .then((r) => r.json())
      .then(setRequests)
      .catch(() => {});
    socketRef.current = io(socketUrl);
    socketRef.current.on("connect", () => console.log("socket connected"));
    socketRef.current.on("new-request", (data) => {
      setRequests((prev) => [data, ...prev]);
    });
    return () => socketRef.current && socketRef.current.disconnect();
  }, []);

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle logout
  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo">🌍 ReliefConnect</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/request">Request Help</Link>
          <Link to="/offer">Offer Help</Link>
          <Link to="/map">Relief Map</Link>

          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`bg-slide ${index === bgIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
        ))}
        <div className="overlay"></div>

        <div className="hero-text">
          <h1>Connecting Help with Those Who Need It Most</h1>
          <p>
            A platform that enables quick, location-based disaster response by
            connecting people in need with volunteers and resources.
          </p>

          <div className="btn-group">
            <Link to="/request" className="btn primary">
              Request Help
            </Link>
            <Link to="/offer" className="btn secondary">
              Offer Help
            </Link>
            <Link to="/map" className="btn outline">
              View Map
            </Link>
          </div>

          <div className="stats">
            <div>
              <h4>Active Requests</h4>
              <p>{requests.length}</p>
            </div>
            <div>
              <h4>Volunteers</h4>
              <p>84</p>
            </div>
            <div>
              <h4>Regions Covered</h4>
              <p>12</p>
            </div>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="info-section">
        <h2>How It Works</h2>
        <ol>
          <li>
            People post requests with location & category (food, shelter,
            medical).
          </li>
          <li>
            Volunteers browse nearby requests or get matched automatically.
          </li>
          <li>Admins/NGOs can monitor summaries & analytics.</li>
        </ol>
      </section>

      <footer>Made with ❤️ for disaster response</footer>
    </div>
  );
}
