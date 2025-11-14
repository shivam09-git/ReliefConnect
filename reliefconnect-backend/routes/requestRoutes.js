import express from "express";
import Request from "../models/requestModel.js";

const router = express.Router();

// ✅ POST a new help request
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming request data:", req.body); // Log what frontend sent

    // Validate required fields manually
    const { name, category, location, contact } = req.body;
    if (!name || !category || !location || !contact) {
      console.log("⚠️ Missing fields in request");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the new request
    const newRequest = await Request.create({ name, category, location, contact });

    // Broadcast to all connected clients in real-time
    if (req.io) {
      req.io.emit("new-request", newRequest);
      console.log("📢 New request broadcasted:", newRequest);
    } else {
      console.warn("⚠️ req.io not found — Socket.IO not attached to request");
    }

    // Send success response
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("❌ Error creating request:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// ✅ GET all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    console.log(`📦 Retrieved ${requests.length} requests`);
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
