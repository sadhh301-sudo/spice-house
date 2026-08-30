import Header from "./components/Header";
import React, { useState } from "react";
import "./App.css";

import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

import heroImage from "./images1.jpg";
import pizzaImage from "./images2.jpg";
import chickenImage from "./images3.jpg";
import pastaImage from "./images4.jpg";

//Wood Fried Pizza gallery 
import pizza1 from "./assets/pizza1 (2).jpg";
import pizza2 from "./assets/pizza2 (2).jpg";
import pizza3 from "./assets/pizza3 (2).jpg";
import pizza4 from "./assets/pizza4.jpg";

//Chicken Burger gallery
import burger1 from "./assets/burger1.jpg";
import burger2 from "./assets/burger2.jpg";
import burger3 from "./assets/burger3.jpg";

//Creamy Pasta gallery
import pasta1 from "./assets/pasta1.jpg";
import pasta2 from "./assets/pasta2.jpg";
import pasta3 from "./assets/pasta3.jpg";

function App() {
  // =========================================
  // PRODUCTS
  // =========================================

  const products = [
    {
      id: 1,
      slug: "wood-fired-pizza",
      name: "Wood-Fired Pizza",
      subtitle: "CRISPY • FRESH • HANDCRAFTED",
      price: "₹349",
      image: pizzaImage,

      gallery:[
        pizza1,
        pizza2,
        pizza3,
        pizza4,
      ],

      description:
        "Our Wood-Fired Pizza is made with freshly prepared dough, premium toppings and aromatic herbs. It is baked in a traditional wood-fired oven to create a crispy crust with a delicious smoky flavour.",
      features: [
        "Freshly prepared dough",
        "Premium cheese",
        "Wood-fired oven",
        "Fresh herbs",
      ],
    },

    {
      id: 2,
      slug: "grilled-chicken",
      name: "Grilled Chicken",
      subtitle: "JUICY • TENDER • FLAVORFUL",
      price: "₹399",
      image: chickenImage,

      gallery:[
        burger1,
        burger2,
        burger3,
      ],

      description:
        "Tender grilled chicken marinated with our special Spice House seasoning and grilled perfectly for a juicy, smoky and flavorful experience.",
      features: [
        "Fresh chicken",
        "Special marinade",
        "Perfectly grilled",
        "Rich smoky flavour",
      ],
    },

    {
      id: 3,
      slug: "creamy-pasta",
      name: "Creamy Pasta",
      subtitle: "RICH • CREAMY • DELICIOUS",
      price: "₹329",
      image: pastaImage,

      gallery:[
        pasta1,
        pasta2,
        pasta3,
      ],

      description:
        "Creamy Pasta prepared with perfectly cooked pasta, rich creamy sauce and fresh herbs. A comforting dish made specially for pasta lovers.",
      features: [
        "Creamy sauce",
        "Fresh pasta",
        "Italian herbs",
        "Rich flavour",
      ],
    },
  ];

  // =========================================
  // STATES
  // =========================================

  // IMPORTANT:
  // Product object illa.
  // Slug mattum store pannuvom.

  const [selectedSlug, setSelectedSlug] = useState(null);

  const [showBooking, setShowBooking] = useState(false);

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
  });

  // =========================================
  // VIEW PRODUCT DETAILS
  // =========================================

  const handleViewDetails = (slug) => {
    setSelectedSlug(slug);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // BOOKING INPUT CHANGE
  // =========================================

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBooking((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================
  // OPEN BOOKING
  // =========================================

  const openBooking = () => {
    setShowBooking(true);
  };

  // =========================================
  // CLOSE BOOKING
  // =========================================

  const closeBooking = () => {
    setShowBooking(false);
  };

  // =========================================
  // HANDLE BOOKING
  // =========================================

  const handleBooking = async (e) => {
    e.preventDefault();

    console.log("BOOKING BUTTON CLICKED");
    console.log("BOOKING DATA:", booking);

    // Check fields

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
      console.log("SENDING BOOKING TO VERCEL API...");

      const response = await fetch("http://localhost:5000/api/send-booking", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(booking),
      });

      console.log("RESPONSE STATUS:", response.status);

      const data = await response.json();

      console.log("SERVER RESPONSE:", data);

      // SUCCESS

      if (data.success) {
        alert("Booking confirmed successfully! 🍽️");

        setBooking({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
        });

        setShowBooking(false);
      }

      // ERROR

      else {
        alert(
          data.message ||
            "Booking failed. Please try again."
        );
      }
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      alert(
        "Server connection failed. Please try again."
      );
    }
  };

  // =========================================
  // PRODUCT DETAIL PAGE
  // =========================================

  if (selectedSlug) {
    return (
      <div className="app">

        {/* =================================
            NAVBAR
        ================================= */}

        <nav className="navbar">

          <div className="logo">
            <h2>SPICE HOUSE</h2>
            <span>RESTAURANT</span>
          </div>

          <div className="nav-links">

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setSelectedSlug(null);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Home
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setSelectedSlug(null);

                setTimeout(() => {
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
            >
              Menu
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setSelectedSlug(null);

                setTimeout(() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
            >
              About
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                setSelectedSlug(null);

                setTimeout(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
            >
              Contact
            </a>

          </div>

          <button
            className="book-btn"
            onClick={openBooking}
          >
            Book a Table
          </button>

        </nav>

        {/* =================================
            SINGLE PRODUCT DETAIL PAGE
            SLUG PASSING THROUGH PROPS
        ================================= */}

        <ProductDetail
          slug={selectedSlug}
          products={products}
          onBack={() => {
            setSelectedSlug(null);

            setTimeout(() => {
              document
                .getElementById("menu")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }, 100);
          }}
          onBook={openBooking}
        />

        {/* =================================
            BOOKING POPUP
        ================================= */}

        {showBooking && (
          <div
            className="booking-overlay"
            onClick={(e) => {
              if (
                e.target.className ===
                "booking-overlay"
              ) {
                closeBooking();
              }
            }}
          >
            <div className="booking-popup">

              <button
                className="close-btn"
                onClick={closeBooking}
              >
                ×
              </button>

              <h2>Book a Table</h2>

              <p>
                Reserve your table at Spice House
              </p>

              <form onSubmit={handleBooking}>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={booking.name}
                  onChange={handleBookingChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={booking.email}
                  onChange={handleBookingChange}
                />

                <input
                  type="date"
                  name="date"
                  value={booking.date}
                  onChange={handleBookingChange}
                />

                <input
                  type="time"
                  name="time"
                  value={booking.time}
                  onChange={handleBookingChange}
                />

                <input
                  type="number"
                  name="guests"
                  placeholder="Number of Guests"
                  min="1"
                  value={booking.guests}
                  onChange={handleBookingChange}
                />

                <button
                  type="submit"
                  className="gold-btn"
                >
                  🍽️ Confirm Booking
                </button>

              </form>

            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================
  // HOME PAGE
  // =========================================

  return (
    <div className="app">
      <Header />

      {/* =================================
          NAVBAR
      ================================= */}

      <nav className="navbar">

        <div className="logo">

          <h2>SPICE HOUSE</h2>

          <span>RESTAURANT</span>

        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#menu">
            Menu
          </a>

          <a href="#about">
            About
          </a>

          <a href="#story">
            Story
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

        <button
          className="book-btn"
          onClick={openBooking}
        >
          Book a Table
        </button>

      </nav>

      {/* =================================
          HERO
      ================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="small-title">
            WELCOME TO SPICE HOUSE
          </p>

          <h1>
            Great Food.
            <br />
            <span>Great Moments.</span>
          </h1>

          <p className="hero-text">
            Experience delicious handcrafted dishes,
            warm hospitality and unforgettable moments
            at Spice House.
          </p>

          <div className="hero-buttons">

            <button
              className="gold-btn"
              onClick={openBooking}
            >
              Book a Table
            </button>

            <a
              href="#menu"
              className="outline-btn"
            >
              Explore Menu
            </a>

          </div>

          <div className="stats">

            <div>
              <strong>10+</strong>
              <span>Signature Dishes</span>
            </div>

            <div>
              <strong>4.9★</strong>
              <span>Guest Rating</span>
            </div>

            <div>
              <strong>5+</strong>
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

            <strong>
              OPEN TODAY
            </strong>

            <span>
              11:00 AM — 11:00 PM
            </span>

          </div>

        </div>

      </section>

      {/* =================================
          ABOUT
      ================================= */}

      <section
        className="about-section"
        id="about"
      >

        <p className="small-title">
          ABOUT SPICE HOUSE
        </p>

        <h2>
          Crafted with passion,
          <br />
          served with love.
        </h2>

        <p>
          At Spice House, we believe that great food
          brings people together. Every dish is prepared
          with fresh ingredients, carefully selected
          flavours and a passion for creating memorable
          dining experiences.
        </p>

      </section>

      {/* =================================
          MENU / PRODUCT LIST
      ================================= */}

      <section
        className="menu-section"
        id="menu"
      >

        <p className="small-title">
          OUR SPECIALITIES
        </p>

        <h2>
          Signature Dishes
        </h2>

        <ProductList
          products={products}
          onViewDetails={handleViewDetails}
        />

      </section>

      {/* =================================
          STORY
      ================================= */}

      <section
        className="story-section"
        id="story"
      >

        <p className="small-title">
          OUR STORY
        </p>

        <h2>
          From our kitchen
          <br />
          to your table.
        </h2>

        <p>
          What started as a passion for good food has
          grown into a place where friends and families
          come together. Our kitchen combines traditional
          flavours with modern presentation to create
          something truly special.
        </p>

      </section>

      {/* =================================
          CONTACT
      ================================= */}

      <section
        className="contact-section"
        id="contact"
      >

        <p className="small-title">
          GET IN TOUCH
        </p>

        <h2>
          Visit Spice House
        </h2>

        <p>
          Come and enjoy delicious food with us.
        </p>

        <br />

        <button
          className="gold-btn"
          onClick={openBooking}
        >
          Book Your Table
        </button>

      </section>

      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <p>
          © 2026 Spice House. All Rights Reserved.
        </p>

        <p>
          Fresh Food • Great Moments
        </p>

      </footer>

      {/* =================================
          BOOKING POPUP
      ================================= */}

      {showBooking && (
        <div
          className="booking-overlay"
          onClick={(e) => {
            if (
              e.target.className ===
              "booking-overlay"
            ) {
              closeBooking();
            }
          }}
        >

          <div className="booking-popup">

            <button
              className="close-btn"
              onClick={closeBooking}
            >
              ×
            </button>

            <h2>
              Book a Table
            </h2>

            <p>
              Reserve your table at Spice House
            </p>

            <form onSubmit={handleBooking}>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={booking.name}
                onChange={handleBookingChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={booking.email}
                onChange={handleBookingChange}
              />

              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleBookingChange}
              />

              <input
                type="time"
                name="time"
                value={booking.time}
                onChange={handleBookingChange}
              />

              <input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                min="1"
                value={booking.guests}
                onChange={handleBookingChange}
              />

              <button
                type="submit"
                className="gold-btn"
              >
                🍽️ Confirm Booking
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;