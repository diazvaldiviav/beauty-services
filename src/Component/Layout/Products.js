import React from "react";
import ProductCard from "../Common/ProductCard";

function Products(props) {
  return (
    <section className="products-section">
      <div className="products-background">
        <div className="products-header">
          <h2 className="products-title">Eco-Friendly Beauty Products</h2>
          <p className="products-subtitle">Sustainable beauty solutions for a better tomorrow</p>
        </div>
        
        <div className="products-grid">
          {props.card.map((card) => (
            <ProductCard key={card.id} img={card.img} name={card.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;