import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Styles/Style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   // Cerrar menú móvil después de hacer clic en un enlace
   const handleMobileLinkClick = (handler) => {
    return (e) => {
      handler(e);
      setIsMobileMenuOpen(false);
    };
  };


    // Detectar scroll para cambiar estilos
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  

  const handleServicesClick = (e) => {
    e.preventDefault();
    // Primero navegamos a la página principal si no estamos en ella
    if (window.location.pathname !== '/') {
      navigate('/');
      // Damos tiempo para que cargue la página principal
      setTimeout(() => {
        const servicesSection = document.querySelector('.services-container');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si ya estamos en la página principal, solo hacemos scroll
      const servicesSection = document.querySelector('.services-container');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <React.StrictMode>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="logo"><Link to="/">Logo</Link></div>
         
         {/* Botón hamburguesa */}
         <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
            <a href="#about" onClick={handleMobileLinkClick(handleAboutClick)}>Nosotros</a>
            <a href="#services" onClick={handleMobileLinkClick(handleServicesClick)}>Servicios</a>
            <a href="#contact" onClick={handleMobileLinkClick(handleContactClick)}>Contacto</a>
            
            {user ? (
              <div className="user-menu">
                <span className="user-name">Hola, {user.name}</span>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>Carrito</Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }} 
                  className="logout-btn"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

    

     

      
      <Outlet />
    </React.StrictMode>
  );
};

export default Header;
