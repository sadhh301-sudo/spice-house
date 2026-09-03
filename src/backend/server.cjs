// ==========================================
// SPICE HOUSE BACKEND SERVER
// ==========================================

// ==========================================
// MONGODB DNS FIX
// ==========================================

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

console.log("custom DNS loaded");

// ==========================================
// IMPORTS
// ==========================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// ==========================================
// MODELS
// ==========================================

const Booking = require("../models/Booking.cjs");
const Product = require("./Models/Product.cjs");

// ==========================================
// APP SETUP
// ==========================================

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");
  })
  .catch((err) => {
    console.error(
      "MongoDB connection error ❌:",
      err.message
    );
  });

// ==========================================
// HOME / TEST
// ==========================================

app.get("/", (req, res) => {
  res.send("Spice House Backend is running 🍴");
});

// ==========================================
// API TEST
// ==========================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// ==========================================
// PRODUCT CRUD
// ==========================================

// GET ALL PRODUCTS
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR ❌:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR ❌:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR ❌:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR ❌:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct =
      await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR ❌:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// CREATE BOOKING
// ==========================================

app.post("/api/bookings", async (req, res) => {
  try {
    console.log("BOOKING REQUEST RECEIVED");

    const {
      name,
      email,
      date,
      time,
      guests,
    } = req.body;

    // Required fields
    if (
      !name ||
      !email ||
      !date ||
      !time ||
      !guests
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required booking details.",
      });
    }

    const booking = new Booking({
      name,
      email,
      date,
      time,
      guests,
      status: "Pending",
    });

    const savedBooking = await booking.save();

    console.log("NEW BOOKING SAVED ✅");

    res.status(201).json({
      success: true,
      message:
        "Booking confirmed successfully! 🎉",
      booking: savedBooking,
    });
  } catch (error) {
    console.error(
      "BOOKING ERROR ❌:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Booking failed.",
      error: error.message,
    });
  }
});

// ==========================================
// GET ALL BOOKINGS
// ==========================================

app.get("/api/bookings", async (req, res) => {
  console.log("BOOKINGS GET REQUEST RECEIVED");

  try {
    const bookings = await Booking
      .find()
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(
      "GET BOOKINGS ERROR ❌:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE BOOKING STATUS
// ==========================================

app.put(
  "/api/bookings/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid booking status",
        });
      }

      const updatedBooking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedBooking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      console.log(
        `BOOKING STATUS UPDATED: ${status} ✅`
      );

      res.json({
        success: true,
        message:
          "Booking status updated successfully",
        booking: updatedBooking,
      });
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR ❌:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// ==========================================
// DELETE BOOKING
// ==========================================

app.delete(
  "/api/bookings/:id",
  async (req, res) => {
    try {
      const booking =
        await Booking.findByIdAndDelete(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.json({
        success: true,
        message:
          "Booking deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE BOOKING ERROR ❌:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to delete booking",
        error: error.message,
      });
    }
  }
);

// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Spice House Backend running on http://localhost:${PORT}`
  );
});