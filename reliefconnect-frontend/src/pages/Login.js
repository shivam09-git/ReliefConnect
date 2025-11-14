import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from "../config";
import { saveToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${CONFIG.API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        saveToken(data.token);
        setMessage({
          type: "success",
          text: "✅ Login successful! Redirecting...",
        });
        setTimeout(() => nav("/"), 1200);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "❌ Login failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Login</h2>

      {message && (
        <div
          style={{
            ...styles.alert,
            backgroundColor:
              message.type === "success" ? "#28a745" : "#dc3545",
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
      </form>

      {/* ✅ SIGN UP LINK */}
      <p style={styles.registerText}>
        Don't have an account?{" "}
        <span
          style={styles.registerLink}
          onClick={() => nav("/register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: 400,
    margin: "100px auto",
    padding: 30,
    borderRadius: 12,
    backgroundColor: "#070707ff",
    color: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #444",
    background: "#e2d9d9ff",
    color: "#111",
  },
  button: {
    padding: "10px 14px",
    borderRadius: 6,
    border: "none",
    background: "#007bff",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  alert: {
    padding: "10px",
    borderRadius: 6,
    textAlign: "center",
    marginBottom: 12,
  },

  // ⭐ NEW STYLES
  registerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#bbb",
  },
  registerLink: {
    color: "#4da3ff",
    cursor: "pointer",
    fontWeight: "600",
  },
};
