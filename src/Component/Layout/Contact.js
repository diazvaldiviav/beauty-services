import React from 'react';
import { FaPinterest, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="row">
          {/* Columna Izquierda */}
          <div className="col-md-6 contact-info">
            <h2 className="contact-title">Contact us</h2>
            
            <div className="contact-details">
              {/* Teléfono */}
              <div className="contact-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>

              {/* Email */}
              <div className="contact-item">
                <h3>Email</h3>
                <p>info@beautyservices.com</p>
              </div>

              {/* Redes Sociales */}
              <div className="contact-item">
                <h3>Social Media</h3>
                <div className="social-icons">
                  <a href="https://www.pinterest.com/" aria-label="Pinterest">
                    <FaPinterest />
                  </a>
                  <a href="https://x.com/i/flow/login" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="https://www.instagram.com/" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="col-md-6 accessibility-info">
            <div className="accessibility-message">
              <p>Our salons are fully accessible. Please reach out for further requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
