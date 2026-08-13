const express = require("express");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-booking", async (req, res) => {
  console.log("REQUEST RECEIVED FROM WEBSITE");

  const { name, email, date, time, guests } = req.body;

  if (!name || !email || !date || !time || !guests) {
    return res.status(400).json({
      success: false,
      message: "Please fill all booking details.",
    });
  }

  const booking = {
    id: Date.now(),
    name,
    email,
    date,
    time,
    guests,
    bookedAt: new Date().toISOString(),
  };

  // Save booking locally
  let bookings = [];

  if (fs.existsSync("bookings.json")) {
    bookings = JSON.parse(
      fs.readFileSync("bookings.json", "utf8")
    );
  }

  bookings.push(booking);

  fs.writeFileSync(
    "bookings.json",
    JSON.stringify(bookings, null, 2)
  );

  console.log("NEW BOOKING:", booking);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.RECEIVER_EMAIL,

      subject: "New Restaurant Booking - Spice House",

      text: `
New Booking Received - Spice House

Name: ${name}
Customer Email: ${email}
Date: ${date}
Time: ${time}
Guests: ${guests}

Thank you.
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    return res.json({
      success: true,
      message: "Booking confirmed and email sent!",
    });

  } catch (error) {

    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Booking saved, but email failed.",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});