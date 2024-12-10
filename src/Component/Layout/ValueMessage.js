import React from 'react';
import clientImage from '../../assets/client-image.jpg'; // Asegúrate de tener esta imagen

const ValueMessage = () => {
  return (
    <section className="value-message">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 image-column">
            <div className="image-wrapper">
              <img 
                src={clientImage} 
                alt="Client Care" 
                className="client-image"
              />
            </div>
          </div>
          
          <div className="col-md-6 content-column">
            <div className="content-wrapper">
              <h2 className="value-title">
                We take care of our clients and our people
              </h2>
              <p className="value-description">
                Our commitment to excellence goes beyond service delivery. 
                We believe in creating meaningful connections and ensuring 
                every client feels valued and cared for throughout their journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueMessage;