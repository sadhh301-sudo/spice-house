const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dns = require("dns").promises;
const nodemailer = require("nodemailer");
require("dotenv").config();

const SMTP_HOST = "smtp.gmail.com";


async function resolveSmtpHost() {
  const { address } = await dns.lookup(SMTP_HOST, { family: 4 });
  return address;
}

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/send-booking", async (req, res) => {
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
      host: await resolveSmtpHost(),
      port: 465,
      secure: true,


      tls: { servername: SMTP_HOST },

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

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});