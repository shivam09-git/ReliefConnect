import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from "../config";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${CONFIG.API_BASE}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "🎉 Registration successful! Redirecting to login...",
        });
        setTimeout(() => nav("/login"), 1500);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Registration failed",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "❌ Failed to register. Try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Create Account</h2>

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
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          style={styles.input}
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create Password"
          required
          style={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      {/* ✔ Already have account */}
      <p style={styles.loginText}>
        Already have an account?{" "}
        <span
          style={styles.loginLink}
          onClick={() => nav("/login")}
        >
          Login
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
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
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
    background: "#28a745",
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
  loginText: {
    marginTop: 15,
    textAlign: "center",
    color: "#bbb",
  },
  loginLink: {
    color: "#4da3ff",
    cursor: "pointer",
    fontWeight: "600",
  },
};
