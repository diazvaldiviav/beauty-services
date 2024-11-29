// src/components/ServiceSidebar.js
import React from "react";
import "../Styles/Style.css";
import { useState } from "react";
import services from "../Data/Services";
import servicesToAppointment from "../Data/ServicesToAppoiment";

// Componente `ServiceSidebar` que muestra el sidebar con la lista de servicios
const ServiceSidebar = ({ isOpen, onClose }) => {
  const [peopleCount, setPeopleCount] = useState(1);

  const handlePeopleChange = (event) => {
    setPeopleCount(event.target.value);
  };
  
  

  
  const handleAddService = (service) => {
    if (peopleCount < 1) {
        alert("La cantidad de personas no puede ser menor que 1");
        setPeopleCount(1);
        return;
    }

    // Verificar si el servicio ya existe en el array
    const existingServiceIndex = servicesToAppointment.findIndex(
        (s) => s.id === service.id
    );

    if (existingServiceIndex !== -1) {
        // Si el servicio ya existe, actualizar la cantidad de personas
        servicesToAppointment[existingServiceIndex].peopleCount = peopleCount;
        alert(`Cantidad de personas actualizada para ${service.name}`);
    } else {
        // Si el servicio no existe, agregarlo al array
        servicesToAppointment.push({
            id: service.id,
            name: service.name,
            price: service.price,
            peopleCount: peopleCount,
            description: service.description
        });
        alert(`Servicio ${service.name} agregado con ${peopleCount} personas`);
    }

    // Mostrar en consola para debugging
    console.log("Servicios actuales:", servicesToAppointment);
    
    
    // Resetear el contador de personas
    setPeopleCount(1);
};

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Botón para cerrar el sidebar */}
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h2>Our Services</h2>
      {/* Lista de servicios */}
      <div className="service-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            {/* Imagen del servicio */}
            <img
              src={service.image}
              alt={service.name}
              className="service-image"
            />

            {/* Detalles del servicio */}
            <div className="service-details">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <p className="service-price">{service.price}</p>
              <div className="people-count-container">
                <label htmlFor={`people-${service.id}`}>Personas:</label>
                {/*id={`people-${service.id}`}*/}
                <input 
                    id={`people-${service.id}`}
                    type="number" 
                    min="1" 
                    value={peopleCount}  
                    onChange={handlePeopleChange} 
                    className="people-count-input"
                />
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddService(service)}
              >
                Añadir servicio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceSidebar;
