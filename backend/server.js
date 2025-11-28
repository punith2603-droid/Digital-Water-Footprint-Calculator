// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const itemRoutes = require("./routes/itemRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// serve frontend static files (index.html, css, js) if you want it via Express:
app.use(express.static(path.join(__dirname, "../frontend")));

// serve images from frontend/images
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

// API routes
app.use("/api/items", itemRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/waterfootprint";

mongoose
  .connect(MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
