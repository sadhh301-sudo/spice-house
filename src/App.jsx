import React, { useState } from "react";
import "./App.css";

import heroImage from "./images1.jpg";
import pizzaImage from "./images2.jpg";
import chickenImage from "./images3.jpg";
import pastaImage from "./images4.jpg";

import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

function App() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });

  // ================= DISHES =================

  const dishes = [
    {
      id: 1,
      name: "Wood-Fired Pizza",
      subtitle: "CRISPY • FRESH • HANDCRAFTED",
      price: "₹349",
      image: pizzaImage,
      description:
        "Our signature Wood-Fired Pizza is prepared with handcrafted dough, rich tomato sauce and premium mozzarella cheese. It is baked in a traditional wood-fired oven to create a crispy crust with a soft and delicious centre.",
      features: [
        "Traditional wood-fired oven",
        "Handcrafted fresh dough",
        "Premium mozzarella cheese",
        "Fresh vegetables and herbs",
      ],
    },

    {
      id: 2,
      name: "Grilled Chicken",
      subtitle: "JUICY • TENDER • FLAVORFUL",
      price: "₹399",
      image: chickenImage,
      description:
        "Our Grilled Chicken is marinated with carefully selected herbs and spices before being perfectly grilled. The result is tender, juicy chicken with a smoky aroma and rich flavour.",
      features: [
        "Fresh premium chicken",
        "Special house marinade",
        "Perfectly grilled",
        "Served with fresh vegetables",
      ],
    },

    {
      id: 3,
      name: "Creamy Pasta",
      subtitle: "CREAMY • RICH • DELICIOUS",
      price: "₹329",
      image: pastaImage,
      description:
        "Our Creamy Pasta combines perfectly cooked pasta with a rich and smooth creamy sauce. Fresh herbs, vegetables and premium ingredients create a comforting and unforgettable taste.",
      features: [
        "Premium quality pasta",
        "Rich creamy sauce",
        "Fresh herbs",
        "Chef's special seasoning",
      ],
    },
  ];

  // ================= BOOKING =================

  const handleBooking = async () => {
    if (
      !booking.name ||
      !booking.email ||
      !booking.date ||
      !booking.time ||
      !booking.guests
    ) {
      alert("Please fill all booking details.");
      return;
    }

    try {
      console.log("BOOKING BUTTON CLICKED");
      console.log("BOOKING DATA:", booking);

      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const data = await response.json();

      console.log("SERVER RESPONSE:", data);

      if (response.ok && data.success) {
        alert("Booking Confirmed! Email sent successfully.");

        setShowBooking(false);

        setBooking({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
        });
      } else {
        alert(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("BOOKING ERROR:", error);
      alert("Server connection failed.");
    }
  };

  // ================= SCROLL FUNCTION =================

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // ================= RETURN =================

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => scrollToSection("home")}
          style={{ cursor: "pointer" }}
        >
          <h2>SPICE</h2>
          <span>HOUSE</span>
        </div>

        <div className="nav-links">

          <a
            href="#home"
            onClick={() => setSelectedDish(null)}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => setSelectedDish(null)}
          >
            About
          </a>

          <a
            href="#menu"
            onClick={() => setSelectedDish(null)}
          >
            Menu
          </a>

          <a
            href="#story"
            onClick={() => setSelectedDish(null)}
          >
            Our Story
          </a>

          <a
            href="#contact"
            onClick={() => setSelectedDish(null)}
          >
            Contact
          </a>

        </div>

        <button
          className="book-btn"
          onClick={() => setShowBooking(true)}
        >
          Book a Table
        </button>

      </nav>


      {/* ================= HOME ================= */}

      <section id="home" className="hero">

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO SPICE HOUSE
          </p>

          <h1>
            Taste the
            <br />
            <span>Extraordinary</span>
          </h1>

          <p className="hero-text">
            A modern restaurant where traditional flavours meet
            contemporary dining. Discover handcrafted dishes,
            premium ingredients and unforgettable flavours.
          </p>

          <div className="hero-buttons">

            <button
              className="gold-btn"
              onClick={() => scrollToSection("menu")}
            >
              Explore Menu →
            </button>

            <button
              className="outline-btn"
              onClick={() => scrollToSection("story")}
            >
              Our Story
            </button>

          </div>

          <div className="stats">

            <div>
              <strong>4.9★</strong>
              <span>Customer Rating</span>
            </div>

            <div>
              <strong>25+</strong>
              <span>Signature Dishes</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Years Experience</span>
            </div>

          </div>

        </div>


        <div className="hero-image">

          <img
            src={heroImage}
            alt="Spice House Restaurant"
          />

          <div className="open-box">

            <strong>OPEN TODAY</strong>

            <span>
              11:00 AM — 11:00 PM
            </span>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="about-section"
      >

        <p className="small-title">
          ABOUT SPICE HOUSE
        </p>

        <h2>
          Where Great Food Meets Great
          <br />
          Moments
        </h2>

        <p>
          Spice House is a warm and modern restaurant created for
          people who love delicious food, beautiful surroundings and
          memorable dining experiences.
        </p>

      </section>


      {/* ================= MENU ================= */}

      {!selectedDish ? (

        <section
          id="menu"
          className="menu-section"
        >

          <p className="small-title">
            OUR SIGNATURE MENU
          </p>

          <h2>
            Explore Our Special Dishes
          </h2>

          <ProductList
            products={dishes}
            onViewDetails={(product) => {
              setSelectedDish(product);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />

        </section>

      ) : (

        /* ================= PRODUCT DETAIL ================= */

        <section id="menu">

          <ProductDetail
            product={selectedDish}
            onBack={() => {
              setSelectedDish(null);

              setTimeout(() => {
                document
                  .getElementById("menu")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 100);
            }}
          />

        </section>

      )}


      {/* ================= STORY ================= */}

      <section
        id="story"
        className="story-section"
      >

        <p className="small-title">
          OUR STORY
        </p>

        <h2>
          Made With Passion, Served With
          <br />
          Love
        </h2>

        <p>
          From carefully selected ingredients to every plate served
          at your table, our chefs focus on quality, freshness and
          flavour. Every visit to Spice House is designed to become
          a memorable experience.
        </p>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="contact-section"
      >

        <p className="small-title">
          VISIT SPICE HOUSE
        </p>

        <h2>
          Reserve Your Table
        </h2>

        <p>
          Come and enjoy handcrafted food in a warm and welcoming
          atmosphere.
        </p>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="logo">

          <h2>SPICE</h2>

          <span>HOUSE</span>

        </div>

        <p>
          © 2026 Spice House. All Rights Reserved.
        </p>

      </footer>


      {/* ================= BOOKING POPUP ================= */}

      {showBooking && (

        <div className="booking-overlay">

          <div className="booking-popup">

            <button
              className="close-btn"
              onClick={() => setShowBooking(false)}
            >
              ×
            </button>

            <h2>
              Book a Table
            </h2>

            <p>
              Reserve your table at Spice House
            </p>


            {/* NAME */}

            <input
              type="text"
              placeholder="Your Name"
              value={booking.name}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  name: e.target.value,
                })
              }
            />


            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email"
              value={booking.email}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  email: e.target.value,
                })
              }
            />


            {/* DATE */}

            <input
              type="date"
              value={booking.date}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  date: e.target.value,
                })
              }
            />


            {/* TIME */}

            <input
              type="time"
              value={booking.time}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  time: e.target.value,
                })
              }
            />


            {/* GUESTS */}

            <input
              type="number"
              min="1"
              placeholder="Number of Guests"
              value={booking.guests}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  guests: e.target.value,
                })
              }
            />


            {/* CONFIRM */}

            <button
              className="gold-btn"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;