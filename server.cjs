const express = require("express");
const cors = require("cors");
const dns = require("dns").promises;
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

require("dotenv").config();

const Product = require("./models/Product");
const Booking = require("./models/Booking");

const app = express();

const PORT = process.env.PORT || 5050;

const SMTP_HOST = "smtp.gmail.com";

// ==========================================
// MIDDLEWARE
// ==========================================

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
  .catch((error) => {
    console.error("MongoDB connection error ❌");
    console.error(error.message);
  });

// ==========================================
// SMTP DNS
// ==========================================

async function resolveSmtpHost() {
  const { address } = await dns.lookup(SMTP_HOST, {
    family: 4,
  });

  return address;
}

// =====================================================
// HOME / SERVER TEST
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Spice House Server is running 🍽️",
  });
});

// =====================================================
// PRODUCT CRUD
// =====================================================

// ==========================================
// CREATE PRODUCT
// ==========================================

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// ==========================================
// READ ALL PRODUCTS
// ==========================================

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
});

// ==========================================
// READ SINGLE PRODUCT
// ==========================================

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
    console.error("GET SINGLE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE PRODUCT
// ==========================================

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE PRODUCT
// ==========================================

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
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
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

// =====================================================
// BOOKING
// =====================================================

// ==========================================
// CREATE BOOKING
// ==========================================

app.post("/api/send-booking", async (req, res) => {
  console.log("BOOKING REQUEST RECEIVED");

  const {
    name,
    email,
    date,
    time,
    guests,
  } = req.body;

  // Check fields

  if (
    !name ||
    !email ||
    !date ||
    !time ||
    !guests
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all booking details.",
    });
  }

  try {
    // ======================================
    // SAVE BOOKING TO MONGODB
    // ======================================

    const booking = await Booking.create({
      name,
      email,
      date,
      time,
      guests: Number(guests),
    });

    console.log(
      "NEW BOOKING SAVED TO MONGODB:",
      booking
    );

    // ======================================
    // SEND EMAIL
    // ======================================

    const transporter =
      nodemailer.createTransport({
        host: await resolveSmtpHost(),

        port: 465,

        secure: true,

        tls: {
          servername: SMTP_HOST,
        },

        connectionTimeout: 10000,

        greetingTimeout: 10000,

        socketTimeout: 20000,

        auth: {
          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.RECEIVER_EMAIL,

      replyTo: email,

      subject:
        "New Restaurant Booking - Spice House",

      text: `
New Booking Received - Spice House

Name: ${name}

Customer Email: ${email}

Date: ${date}

Time: ${time}

Guests: ${guests}

Booking ID: ${booking._id}

Thank you.
      `,
    });

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );

    return res.json({
      success: true,

      message:
        "Booking confirmed and email sent!",

      booking,
    });
  } catch (error) {
    console.error(
      "BOOKING ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Booking failed.",

      error: error.message,
    });
  }
});

// ==========================================
// READ ALL BOOKINGS
// ==========================================

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings =
      await Booking.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(
      "GET BOOKINGS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
      error: error.message,
    });
  }
});

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
        "DELETE BOOKING ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete booking",
        error: error.message,
      });
    }
  }
);

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(
    `Spice House Server running on http://localhost:${PORT}`
  );
});