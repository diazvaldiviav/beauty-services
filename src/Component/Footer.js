import React from 'react';
import '../Styles/Style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Belleza. Todos los derechos reservados.</p>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
