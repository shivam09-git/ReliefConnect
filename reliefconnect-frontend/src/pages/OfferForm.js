import React, { useState } from "react";
import CONFIG from "../config";

export default function OfferForm() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    method: "UPI",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${CONFIG.API_BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("✅ Thank you for your generous offer!");
        setForm({ name: "", amount: "", method: "UPI", message: "" });
      } else {
        setError(data.message || "❌ Something went wrong.");
      }
    } catch (err) {
      setError("❌ Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤝 Offer Help / Make a Donation</h2>
      <p style={styles.subtitle}>
        Your contribution helps us reach victims faster and save more lives.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="amount"
          placeholder="Amount (₹)"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select
          style={styles.select}
          name="method"
          value={form.method}
          onChange={handleChange}
        >
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          style={styles.textarea}
          name="message"
          placeholder="Message or Description"
          value={form.message}
          onChange={handleChange}
        ></textarea>

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Offer"}
        </button>

        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

// Inline styles (clean + modern)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "120px auto",
    padding: "40px",
    background: "rgba(204, 98, 228, 0.63)",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    color: "#090606ff",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#0e0a0aff",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  select: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    minHeight: "100px",
    fontSize: "1rem",
  },
  button: {
    background: "#28a745",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },
  success: {
    color: "#00ff99",
    textAlign: "center",
    marginTop: "10px",
  },
  error: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: "10px",
  },
};
