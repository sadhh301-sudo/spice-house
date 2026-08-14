import React from "react";

function ProductList({ products, onViewDetails }) {
  return (
    <div className="dish-container">
      {products.map((product) => (
        <div className="dish-card" key={product.id}>

          <img
            src={product.image}
            alt={product.name}
          />

          <div className="dish-info">

            <p className="dish-subtitle">
              {product.subtitle}
            </p>

            <h3>{product.name}</h3>

            <div className="price">
              {product.price}
            </div>

            <button
              className="details-btn"
              onClick={() => onViewDetails(product)}
            >
              View Full Details →
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}

export default ProductList;