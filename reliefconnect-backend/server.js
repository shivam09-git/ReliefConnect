import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// ✅ Import all routes
import requestRoutes from "./routes/requestRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ✅ Attach io to all requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ API Routes
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes); // <-- Added donation route here

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🌐 API is running...");
});

// ✅ Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 Client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
