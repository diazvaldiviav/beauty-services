import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import aboutPhoto from "../assets/header_photo2.jpg";

const Services = (props) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!props.services) {
    return <div>Loading...</div>;
  }

  // Número inicial de servicios a mostrar
  const initialServices = 6;
  // Servicios que se mostrarán según el estado
  const displayedServices = showAll 
    ? props.services 
    : props.services.slice(0, initialServices);

  return (
    <div className="services-container py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="service-title">Our Services</h1>
          </div>
        </div>

        <div className="row">
          {displayedServices.map(service => (
            <div key={service.id} className="col-md-4 mb-4">
              <Link 
                to={`/Services/${service.id}`} 
                className="service-card text-decoration-none"
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="row g-0 align-items-center">
                    <div className="col-8">
                      <div className="card-body">
                        <h3 className="service-name mb-3">{service.name}</h3>
                        <p className="service-description mb-0">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="service-image-wrapper">
                        <img 
                          src={aboutPhoto} 
                          alt={service.name} 
                          className="img-fluid h-100 w-100 service-image-card"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Botón Ver más */}
        {props.services.length > initialServices && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button 
                className="view-more-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Ver menos' : 'Ver más'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;



{/*import React from 'react';
import '../Styles/Style.css';
// import services from '../Data/Services';
import Card from './Card';
import { Link } from 'react-router-dom';
import aboutPhoto from "../assets/header_photo2.jpg";


const Services = (props) => {
 
  return (
   <React.StrictMode> 
    <div className='service-title'><h1>Our Services</h1></div>
    <section className="services">
      {props.services.map(service => (
        <Link to={`/Services/${service.id}`} key={service.id} className="card-link">
        <Card
          key={service.id}
          imageUrl={aboutPhoto}
          name={service.name}
          description={service.description}
        />
         </Link>
      ))}
     
    </section>
    </React.StrictMode>
  );
};

export default Services;*/}
