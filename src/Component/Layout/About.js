import React from "react";
import "../../Styles/Style.css";
import aboutPhoto from "../../assets/photo-about.png";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Contenedor de imagen */}
        <div className="about-image-wrapper">
          <img 
            src={aboutPhoto} 
            alt="Facial Treatment" 
            className="about-image"
            loading="lazy"
          />
        </div>

        {/* Contenedor de información */}
        <div className="about-content">
          <h2 className="about-title">We are a full-service salon</h2>
          <h3 className="about-subtitle">Experience luxury and relaxation</h3>
          <p className="about-description">
            Welcome to our sanctuary of beauty and wellness, where every visit is 
            a journey towards your best self. Our expert team combines artistry 
            with precision to deliver exceptional beauty services tailored to your 
            unique needs. From rejuvenating facials to transformative hair 
            treatments, we're dedicated to enhancing your natural beauty while 
            providing a peaceful escape from the everyday.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;