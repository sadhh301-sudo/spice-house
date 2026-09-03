import React from "react";

function ProductList({ products, onViewDetails }) {
  return (
    <div className="dish-container">

      {(products || []).map((product) => (
        <div className="dish-card" key={product.id}>

          <img
            src={product.image}
            alt={product.name}
            className="dish-image"
          />

          <div className="dish-info">

            <p className="dish-subtitle">
              {product.subtitle}
            </p>

            <h3>{product.name}</h3>

            <p className="dish-description">
              {product.description}
            </p>

            <p className="price">
              {product.price}
            </p>

            <button
              className="details-btn"
              onClick={() => onViewDetails(product.slug)}
            >
              View Details →
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default ProductList;