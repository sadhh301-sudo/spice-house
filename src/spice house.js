import React, { useState } from "react";
import "./App.css";

import heroImage from "./images1.jpg";
import pizzaImage from "./images2.jpg";
import chickenImage from "./images3.jpg";
import pastaImage from "./images4.jpg";

function App() {
  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = [
    {
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

  if (selectedDish) {
    return (
      <div className="app">
        <header className="navbar">
          <div className="logo">
            <span>SPICE</span>
            <small>HOUSE</small>
          </div>

          <nav>
            <button onClick={() => setSelectedDish(null)}>Home</button>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#contact">Contact</a>
          </nav>

          <button className="book-btn">Book a Table</button>
        </header>

        <main className="dish-page">
          <div className="dish-image-box">
            <img src={selectedDish.image} alt={selectedDish.name} />
          </div>

          <div className="dish-content">
            <p className="small-title">SPICE HOUSE • SIGNATURE DISH</p>

            <h1>{selectedDish.name}</h1>

            <h3>{selectedDish.subtitle}</h3>

            <p className="dish-description">
              {selectedDish.description}
            </p>

            <div className="features">
              {selectedDish.features.map((feature, index) => (
                <div className="feature" key={index}>
                  ✓ {feature}
                </div>
              ))}
            </div>

            <div className="dish-bottom">
              <strong>{selectedDish.price}</strong>
              <button className="order-btn">Order Now</button>
            </div>

            <button
              className="back-btn"
              onClick={() => setSelectedDish(null)}
            >
              ← Back to Menu
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>SPICE</span>
          <small>HOUSE</small>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="book-btn">Book a Table</button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-text">
          <p className="small-title">WELCOME TO SPICE HOUSE</p>

          <h1>
            Taste the
            <span> Extraordinary</span>
          </h1>

          <p className="hero-description">
            A modern restaurant where traditional flavours meet
            contemporary dining. Discover handcrafted dishes, premium
            ingredients and unforgettable flavours.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="main-btn">
              Explore Menu →
            </a>

            <a href="#story" className="outline-btn">
              Our Story
            </a>
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
          <img src={heroImage} alt="Spice House" />

          <div className="open-card">
            <strong>OPEN TODAY</strong>
            <span>11:00 AM — 11:00 PM</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <p className="small-title">ABOUT SPICE HOUSE</p>
        <h2>Where Great Food Meets Great Moments</h2>

        <p>
          Spice House is a warm and modern restaurant created for people
          who love delicious food, beautiful surroundings and memorable
          dining experiences.
        </p>
      </section>

      {/* MENU */}
      <section className="menu section" id="menu">
        <p className="small-title">OUR SIGNATURE MENU</p>

        <h2>Explore Our Special Dishes</h2>

        <div className="menu-grid">
          {dishes.map((dish) => (
            <div className="dish-card" key={dish.name}>
              <img src={dish.image} alt={dish.name} />

              <div className="dish-card-content">
                <p>{dish.subtitle}</p>

                <h3>{dish.name}</h3>

                <span>{dish.price}</span>

                <button onClick={() => setSelectedDish(dish)}>
                  View Full Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="story section" id="story">
        <p className="small-title">OUR STORY</p>

        <h2>Made With Passion, Served With Love</h2>

        <p>
          From carefully selected ingredients to every plate served at
          your table, our chefs focus on quality, freshness and flavour.
          Every visit to Spice House is designed to become a memorable
          experience.
        </p>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <p className="small-title">VISIT SPICE HOUSE</p>

        <h2>Reserve Your Table</h2>

        <p>
          Come and enjoy handcrafted food in a warm and welcoming
          atmosphere.
        </p>

        <button className="main-btn">Book a Table →</button>
      </section>

      <footer>
        <div className="logo">
          <span>SPICE</span>
          <small>HOUSE</small>
        </div>

        <p>© 2026 Spice House. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;