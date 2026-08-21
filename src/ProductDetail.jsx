import React, { useState } from "react";

function ProductDetail({ slug, products, onBack, onBook }) {

  // Find selected product
  const product = products.find(
    (item) => item.slug === slug
  );

  // Selected image
  const [selectedImage, setSelectedImage] = useState(
    product?.image
  );

  // Active tab
  const [activeTab, setActiveTab] = useState("details");

  // Selected size
  const [selectedSize, setSelectedSize] = useState("Regular");

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // If product doesn't exist
  if (!product) {
    return (
      <section className="detail-section not-found">

        <div>
          <h2>Product not found</h2>

          <button
            className="gold-btn"
            onClick={onBack}
          >
            ← Back to Menu
          </button>
        </div>

      </section>
    );
  }

  // Gallery images
  const galleryImages = product.gallery?.length
    ? product.gallery
    : [product.image];

  // Reviews
  const reviews = product.reviews || [
    {
      name: "Rahul",
      rating: 5,
      comment: "Amazing taste and very fresh!"
    },
    {
      name: "Priya",
      rating: 4,
      comment: "Really delicious. Loved it!"
    },
    {
      name: "Arun",
      rating: 5,
      comment: "Perfect food and great quality."
    }
  ];

  // Ingredients
  const ingredients = product.ingredients || [
    "Fresh vegetables",
    "Premium cheese",
    "Italian herbs",
    "Tomato sauce",
    "Special seasoning"
  ];

  return (
    <section className="detail-section">

      {/* =================================================
          LEFT SIDE - IMAGE
          ================================================= */}

      <div className="detail-image">

        {/* Main Image */}

        <div className="main-product-image">

          <img
            src={selectedImage}
            alt={product.name}
          />

        </div>


        {/* Image Gallery */}

        <div className="detail-gallery">

          {galleryImages.map((image, index) => (

            <button
              key={index}
              className={`gallery-btn ${
                selectedImage === image
                  ? "active-gallery"
                  : ""
              }`}
              onClick={() => setSelectedImage(image)}
            >

              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
              />

            </button>

          ))}

        </div>


        {/* =================================================
            PRODUCT TABS
            ================================================= */}

        <div className="product-tabs">

          <button
            className={
              activeTab === "details"
                ? "tab-btn active-tab"
                : "tab-btn"
            }
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>


          <button
            className={
              activeTab === "ingredients"
                ? "tab-btn active-tab"
                : "tab-btn"
            }
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>


          <button
            className={
              activeTab === "how"
                ? "tab-btn active-tab"
                : "tab-btn"
            }
            onClick={() => setActiveTab("how")}
          >
            How It's Made
          </button>


          <button
            className={
              activeTab === "reviews"
                ? "tab-btn active-tab"
                : "tab-btn"
            }
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>

        </div>


        {/* =================================================
            TAB CONTENT
            ================================================= */}

        <div className="tab-content">


          {/* PRODUCT DETAILS */}

          {activeTab === "details" && (

            <div className="tab-panel">

              <h3>About this dish</h3>

              <p>
                {product.description ||
                  "Freshly prepared with premium ingredients and authentic flavours."}
              </p>


              <div className="detail-features">

                {product.features?.map(
                  (feature, index) => (

                    <div
                      key={index}
                      className="detail-feature"
                    >
                      ✓ {feature}
                    </div>

                  )
                )}

              </div>

            </div>

          )}


          {/* INGREDIENTS */}

          {activeTab === "ingredients" && (

            <div className="tab-panel">

              <h3>Ingredients</h3>

              <p className="tab-small-text">
                We use fresh and quality ingredients
                to prepare every dish.
              </p>

              <div className="ingredients-list">

                {ingredients.map(
                  (ingredient, index) => (

                    <div
                      key={index}
                      className="ingredient-item"
                    >
                      <span>✓</span>
                      {ingredient}
                    </div>

                  )
                )}

              </div>

            </div>

          )}


          {/* HOW IT'S MADE */}

          {activeTab === "how" && (

            <div className="tab-panel">

              <h3>How It's Made</h3>

              <div className="making-steps">

                <div className="making-step">

                  <span>01</span>

                  <div>
                    <h4>Fresh Ingredients</h4>
                    <p>
                      We carefully select fresh
                      ingredients every day.
                    </p>
                  </div>

                </div>


                <div className="making-step">

                  <span>02</span>

                  <div>
                    <h4>Careful Preparation</h4>
                    <p>
                      Our chefs prepare every dish
                      with attention to detail.
                    </p>
                  </div>

                </div>


                <div className="making-step">

                  <span>03</span>

                  <div>
                    <h4>Freshly Cooked</h4>
                    <p>
                      The dish is cooked fresh and
                      served hot.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          )}


          {/* REVIEWS */}

          {activeTab === "reviews" && (

            <div className="tab-panel">

              <h3>Customer Reviews</h3>

              <div className="reviews-list">

                {reviews.map(
                  (review, index) => (

                    <div
                      className="review-card"
                      key={index}
                    >

                      <div className="review-top">

                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          {"★".repeat(review.rating || 5)}
                        </span>

                      </div>

                      <p>
                        {review.comment}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          RIGHT SIDE - PRODUCT INFORMATION
          ================================================= */}

      <div className="detail-content">

        {/* Back */}

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Back to Menu
        </button>


        {/* Special Label */}

        <div className="special-label">
          SPICE HOUSE SPECIAL
        </div>


        {/* Product Name */}

        <h1>
          {product.name}
        </h1>


        {/* Rating */}

        <div className="rating-row">

          <span className="rating">
            ⭐ {product.rating || "4.6"}
          </span>

          <span className="rating-text">
            {product.reviewCount || "1,248"} Ratings &
            Reviews
          </span>

        </div>


        {/* Price */}

        <div className="price-section">

          <h2>
            {product.price}
          </h2>

          {product.oldPrice && (
            <span className="old-price">
              {product.oldPrice}
            </span>
          )}

          <span className="discount">
            22% OFF
          </span>

        </div>


        <p className="tax-text">
          Inclusive of all taxes
        </p>


        {/* =================================================
            OFFERS
            ================================================= */}

        <div className="offers-box">

          <h3>Available offers</h3>

          <p>✓ 5% Instant Discount on PREPAID orders</p>

          <p>✓ Bank Offer on all major Credit Cards</p>

          <p>✓ Get ₹50 off on your first order</p>

          <button className="offer-link">
            View all offers →
          </button>

        </div>


        {/* =================================================
            SIZE
            ================================================= */}

        <div className="size-section">

          <h3>Select Size</h3>

          <div className="size-buttons">

            <button
              className={
                selectedSize === "Regular"
                  ? "size-btn selected-size"
                  : "size-btn"
              }
              onClick={() =>
                setSelectedSize("Regular")
              }
            >
              Regular (8 inch)
            </button>


            <button
              className={
                selectedSize === "Large"
                  ? "size-btn selected-size"
                  : "size-btn"
              }
              onClick={() =>
                setSelectedSize("Large")
              }
            >
              Large (12 inch)
            </button>

          </div>

        </div>


        {/* =================================================
            DELIVERY
            ================================================= */}

        <div className="delivery-box">

          <span>🚚</span>

          <div>

            <strong>
              Deliver to 600001
            </strong>

            <p>
              Delivery by Tomorrow 10 PM
            </p>

          </div>

          <button className="change-btn">
            Change
          </button>

        </div>


        {/* =================================================
            ABOUT
            ================================================= */}

        <div className="about-dish">

          <h3>
            About this dish
          </h3>

          <p>
            {product.description ||
              "Handcrafted with fresh ingredients, premium cheese and our special sauce. Prepared fresh for a perfect bite."}
          </p>

        </div>


        {/* =================================================
            QUICK FEATURES
            ================================================= */}

        <div className="quick-features">

          <span>🔥 Wood Fired</span>

          <span>🌿 Fresh Ingredients</span>

          <span>🛡️ No Preservatives</span>

          <span>⭐ Hygienically Prepared</span>

        </div>


        {/* =================================================
            QUANTITY
            ================================================= */}

        <div className="quantity-section">

          <span>Quantity</span>

          <div className="quantity-box">

            <button
              onClick={() =>
                setQuantity(
                  Math.max(1, quantity - 1)
                )
              }
            >
              −
            </button>

            <span>
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>

        </div>


        {/* =================================================
            ACTION BUTTONS
            ================================================= */}

        <div className="action-buttons">

          <button
            className="cart-btn"
            onClick={() =>
              alert(
                `${product.name} added to cart!`
              )
            }
          >
            🛒 ADD TO CART
          </button>


          <button
            className="buy-btn"
            onClick={onBook}
          >
            BUY NOW
          </button>

        </div>


        {/* BOOK TABLE */}

        <button
          className="book-table-btn"
          onClick={onBook}
        >
          🍽️ Book a Table
        </button>

      </div>

    </section>
  );
}

export default ProductDetail;