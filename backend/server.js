const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local React App (Vite default)
      "https://tom-tracker.vercel.app", // Live Vercel Frontend
    ],
    credentials: true,
  }),
);

// Database Connection
let isConnected = false;
app.use(async (req, res, next) => {
  if (isConnected) return next();
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
    next();
  } catch (err) {
    console.log("❌ DB Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes (We will create these next)
app.use("/api/v1", require("./routes/transaction"));

// Base route to check if API is alive
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Tracker.Tom API is running smoothly!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
