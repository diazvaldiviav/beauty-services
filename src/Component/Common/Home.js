import React from 'react';
import "../../Styles/Style.css";
import headerPhoto from "../../assets/freepik__upload__11626.jpeg";

const Home = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* Contenedor de imagen con overlay */}
        <div className="hero-image-container">
          <img 
            src={headerPhoto} 
            alt="Natural Beauty Portrait" 
            className="hero-image"
            loading="lazy"
          />
          <div className="hero-overlay"></div>
        </div>

        {/* Contenido principal */}
        <div className="hero-content">
          <div className="content-wrapper">
            <h1 className="hero-title">
              Letting your true beauty shine
            </h1>
            <h2 className="hero-subtitle">
              Experience world-class hair and beauty services
            </h2>
            <button className="book-button">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;