const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

console.log("custom DNS loaded");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Spice House Backend is running 🍴");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Spice House Backend running on http://localhost:${PORT}`
  );
});