import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";

import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import AdminBookings from "./components/AdminBookings";

// =========================================
// MAIN IMAGES
// =========================================

import heroImage from "./images1.jpg";
import pizzaImage from "./images2.jpg";
import chickenImage from "./images3.jpg";
import pastaImage from "./images4.jpg";

// =========================================
// PIZZA GALLERY
// =========================================

import pizza1 from "./assets/pizza1 (2).jpg";
import pizza2 from "./assets/pizza2 (2).jpg";
import pizza3 from "./assets/pizza3 (2).jpg";
import pizza4 from "./assets/pizza4.jpg";

// =========================================
// CHICKEN GALLERY
// =========================================

import burger1 from "./assets/burger1.jpg";
import burger2 from "./assets/burger2.jpg";
import burger3 from "./assets/burger3.jpg";

// =========================================
// PASTA GALLERY
// =========================================

import pasta1 from "./assets/pasta1.jpg";
import pasta2 from "./assets/pasta2.jpg";
import pasta3 from "./assets/pasta3.jpg";


// =========================================
// BOOKING POPUP
// =========================================

function BookingPopup({
  showBooking,
  booking,
  handleBookingChange,
  handleBooking,
  closeBooking,
}) {
  if (!showBooking) {
    return null;
  }

  return (
    <div
      className="booking-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeBooking();
        }
      }}
    >
      <div className="booking-popup">

        <button
          className="close-btn"
          onClick={closeBooking}
          type="button"
        >
          ×
        </button>

        <h2>Book a Table</h2>

        <p>
          Reserve your table at Spice House
        </p>

        <form onSubmit={handleBooking}>

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={booking.name}
            onChange={handleBookingChange}
            autoComplete="name"
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={booking.email}
            onChange={handleBookingChange}
            autoComplete="email"
            required
          />

          {/* DATE */}

          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleBookingChange}
            required
          />

          {/* TIME */}

          <input
            type="time"
            name="time"
            value={booking.time}
            onChange={handleBookingChange}
            required
          />

          {/* GUESTS */}

          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            min="1"
            max="10"
            value={booking.guests}
            onChange={handleBookingChange}
            required
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
  );
}


// =========================================
// APP
// =========================================

function App() {

  // =========================================
  // PRODUCTS
  // =========================================

  const productsData = [
    {
      id: 1,
      slug: "wood-fired-pizza",
      name: "Wood-Fired Pizza",
      subtitle: "CRISPY • FRESH • HANDCRAFTED",
      price: "₹349",
      image: pizzaImage,

      gallery: [
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

      gallery: [
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

      gallery: [
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

  const [products, setProducts] = useState(productsData);

  const [searchTerm, setSearchTerm] = useState("");

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
  // GET PRODUCTS FROM BACKEND
  // =========================================

  useEffect(() => {

    fetch("http://localhost:5000/api/products")

      .then((response) => response.json())

      .then((data) => {

        console.log(
          "BACKEND PRODUCTS:",
          data
        );

        if (
          data.success &&
          Array.isArray(data.products) &&
          data.products.length > 0
        ) {
          setProducts(data.products);
        }

      })

      .catch((error) => {

        console.error(
          "PRODUCT FETCH ERROR:",
          error
        );

        setProducts(productsData);

      });

  }, []);


  // =========================================
  // PRODUCT SEARCH
  // =========================================

  const filteredProducts = products.filter(
    (product) => {

      const search = searchTerm
        .trim()
        .toLowerCase();

      const name = String(
        product.name || ""
      ).toLowerCase();

      const slug = String(
        product.slug || ""
      ).toLowerCase();

      const subtitle = String(
        product.subtitle || ""
      ).toLowerCase();

      return (
        name.includes(search) ||
        slug.includes(search) ||
        subtitle.includes(search)
      );
    }
  );


  // =========================================
  // ADMIN PAGE
  // =========================================

  if (window.location.pathname === "/admin") {
    return <AdminBookings />;
  }


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


    // =========================================
    // EMPTY FIELD VALIDATION
    // =========================================

    if (
      !booking.name.trim() ||
      !booking.email.trim() ||
      !booking.date ||
      !booking.time ||
      !booking.guests
    ) {

      alert(
        "Please fill all booking details."
      );

      return;
    }


    // =========================================
    // NAME VALIDATION
    // =========================================

    const namePattern =
      /^[A-Za-z ]{2,50}$/;

    if (
      !namePattern.test(
        booking.name.trim()
      )
    ) {

      alert(
        "Name should contain letters only."
      );

      return;
    }


    // =========================================
    // EMAIL VALIDATION
    // =========================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        booking.email.trim()
      )
    ) {

      alert(
        "Please enter a valid email address."
      );

      return;
    }


    // =========================================
    // DATE VALIDATION
    // =========================================

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    if (booking.date < today) {

      alert(
        "Please select today or a future date."
      );

      return;
    }


    // =========================================
    // GUEST VALIDATION
    // =========================================

    const guests =
      Number(booking.guests);

    if (
      guests < 1 ||
      guests > 10
    ) {

      alert(
        "Number of guests must be between 1 and 10."
      );

      return;
    }


    // =========================================
    // TIME VALIDATION
    // =========================================

    const selectedTime =
      booking.time;

    if (
      selectedTime < "11:00" ||
      selectedTime > "23:00"
    ) {

      alert(
        "Please select a time between 11:00 AM and 11:00 PM."
      );

      return;
    }


    // =========================================
    // SEND BOOKING TO BACKEND
    // =========================================

    try {

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(booking),
        }
      );


      const data =
        await response.json();


      console.log(
        "SERVER RESPONSE:",
        data
      );


      if (data.success) {

        alert(
          "Booking confirmed successfully! 🍽️"
        );


        setBooking({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
        });


        setShowBooking(false);

      } else {

        alert(
          data.message ||
          "Booking failed. Please try again."
        );

      }

    } catch (error) {

      console.error(
        "BOOKING ERROR:",
        error
      );

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

        <nav className="navbar">

          <div className="logo">

            <h2>
              SPICE HOUSE
            </h2>

            <span>
              RESTAURANT
            </span>

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


        <BookingPopup
          showBooking={showBooking}
          booking={booking}
          handleBookingChange={
            handleBookingChange
          }
          handleBooking={handleBooking}
          closeBooking={closeBooking}
        />

      </div>
    );
  }


  // =========================================
  // HOME PAGE
  // =========================================

  return (
    <div className="app">

      <Header />


      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">

          <h2>
            SPICE HOUSE
          </h2>

          <span>
            RESTAURANT
          </span>

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


      {/* HERO */}

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

            <span>
              Great Moments.
            </span>
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

              <strong>
                10+
              </strong>

              <span>
                Signature Dishes
              </span>

            </div>


            <div>

              <strong>
                4.9★
              </strong>

              <span>
                Guest Rating
              </span>

            </div>


            <div>

              <strong>
                5+
              </strong>

              <span>
                Years Experience
              </span>

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


      {/* ABOUT */}

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


      {/* MENU */}

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


        {/* SEARCH BOX */}

        <div className="product-search">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        {/* PRODUCTS */}

        <ProductList
          products={filteredProducts}
          onViewDetails={
            handleViewDetails
          }
        />

      </section>


      {/* STORY */}

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


      {/* CONTACT */}

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


      {/* FOOTER */}

      <footer>

        <p>
          © 2026 Spice House. All Rights Reserved.
        </p>

        
        <p>
          Fresh Food Great Moments
        </p>

        </footer>


        {/* BOOKING POPUP */}
        <BookingPopup
          showBooking={showBooking}
          booking={booking}
          handleBookingChange={
            handleBookingChange
          }
          handleBooking={handleBooking}
          closeBooking={closeBooking}
        />
        
        
        </div>
        );
      }


      export default App;