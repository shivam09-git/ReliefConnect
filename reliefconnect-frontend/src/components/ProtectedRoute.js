import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, isAuthenticated, decodeToken, clearToken } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const token = getToken();

      if (!token) {
        setAuthorized(false);
      } else {
        // Optional: if using JWT, verify expiry or role
        const decoded = decodeToken();
        if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
          console.warn("⚠️ Token expired, logging out...");
          clearToken();
          setAuthorized(false);
        } else {
          setAuthorized(isAuthenticated());
        }
      }
    } catch (err) {
      console.error("❌ Error verifying authentication:", err);
      setAuthorized(false);
    } finally {
      setChecking(false);
    }
  }, []);

  // Show loader while checking auth
  if (checking) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return children;
}
