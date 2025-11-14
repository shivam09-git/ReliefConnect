import React, { useState } from "react";
import CONFIG from "../config";

export default function RequestForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${CONFIG.API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Request submitted successfully!");
        setForm({ name: "", category: "", location: "", contact: "" });
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Failed to send request");
    }
  };

  return (
    <>
      <style>{`
        .request-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f1f2f5ff;
        }

        .request-box {
          background: #6f92d7ff;
          border-radius: 15px;
          padding: 40px;
          width: 400px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .request-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        }

        .request-box h2 {
          font-size: 1.8rem;
          color: #2d2d2d;
          margin-bottom: 8px;
        }

        .request-box p {
          color: #333;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .request-box form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .request-box input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .request-box input:focus {
          border-color: #6a5acd;
          box-shadow: 0 0 8px rgba(106, 90, 205, 0.4);
        }

        .request-box button {
          background: #28a745;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .request-box button:hover {
          background: #218838;
          transform: scale(1.03);
        }

        .request-box p.message {
          margin-top: 15px;
          font-weight: 500;
          color: #2e7d32;
        }
      `}</style>

      <div className="request-container">
        <div className="request-box">
          <h2>📩 Request Help</h2>
          <p>Please fill out the details below to request urgent assistance.</p>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (e.g. Food, Medical)"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact Info"
              required
            />
            <button type="submit">Submit Request</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}
