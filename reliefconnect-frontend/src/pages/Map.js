import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  useEffect(() => {
    // Initialize Map
    const map = L.map("map", {
      zoomControl: false,
    }).setView([22.9734, 78.6569], 5); // Center of India

    // 🌍 Satellite Tile Layer (Esri World Imagery - Free)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "&copy; Esri",
      }
    ).addTo(map);

    // ---- Generate Random Coordinates Inside India ----
    function randomIndiaLocation() {
      const lat = 8.4 + Math.random() * (37.1 - 8.4); // India latitude range
      const lon = 68.7 + Math.random() * (97.25 - 68.7); // India longitude range
      return [lat, lon];
    }

    // 🟡 Add 25 random markers
    for (let i = 0; i < 25; i++) {
      const [lat, lon] = randomIndiaLocation();

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(
          `<b>Relief Point</b><br>Lat: ${lat.toFixed(
            2
          )}, Lon: ${lon.toFixed(2)}`
        );
    }
  }, []);

  return (
    <>
      <style>{`
        .map-wrapper {
          display: flex;
          justify-content: center;
          padding-top: 120px;
          width: 100%;
        }

        .map-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 25px;
          width: 90%;
          max-width: 900px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid #e6e6e6;
          animation: fadeIn 0.5s ease-in-out;
        }

        .map-title {
          font-size: 1.8rem;
          margin-bottom: 5px;
          font-weight: 700;
          color: #222;
        }

        .map-subtitle {
          font-size: 1rem;
          color: #555;
          margin-bottom: 20px;
        }

        #map {
          height: 450px;
          width: 100%;
          border-radius: 15px;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="map-wrapper">
        <div className="map-box">
          <h2 className="map-title">🛰️ Satellite Relief Map</h2>
          <p className="map-subtitle">
            Viewing relief activity across India using satellite imagery.
          </p>

          <div id="map"></div>
        </div>
      </div>
    </>
  );
}
