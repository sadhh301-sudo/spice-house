import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, date, time, guests } = req.body;

    if (!name || !email || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message: "Please fill all booking details",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,

      subject: "🍽️ New Spice House Booking",

      text: `
New Booking Received - Spice House

Name: ${name}
Customer Email: ${email}
Date: ${date}
Time: ${time}
Guests: ${guests}

Spice House Restaurant
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Booking confirmed and email sent!",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Email failed",
      error: error.message,
    });
  }
}