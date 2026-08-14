import React from "react";

function ProductDetail({ product, onBack }) {
  if (!product) {
    return <p>Product not selected</p>;
  }

  return (
    <section className="detail-section">

      <div className="detail-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="detail-content">

        <h1>{product.name}</h1>

        <p className="detail-subtitle">
          {product.subtitle}
        </p>

        <p className="detail-description">
          {product.description}
        </p>

        <div className="features">
          {product.features.map((feature, index) => (
            <div
              className="feature-box"
              key={index}
            >
              ✓ {feature}
            </div>
          ))}
        </div>

        <div className="detail-bottom">
          <h2>{product.price}</h2>

          <button className="gold-btn">
            Order Now
          </button>
        </div>

        <button
          className="back-btn"
          onClick={onBack}
        >
          ← Back to Menu
        </button>

      </div>

    </section>
  );
}

export default ProductDetail;