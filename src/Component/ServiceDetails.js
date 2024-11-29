import services from "../Data/Services";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import aboutPhoto from "../assets/header_photo2.jpg";
import ServiceSidebar from "./ServiceSidebar";
import AppointmentCalendar from "./AppoinmentCalendar";
import UserForm from "./Form";
import Appointmenttest from "../Data/Appoinmenttest";
import servicesToAppointment from "../Data/ServicesToAppoiment";
import Modal from "./Modal";

function ServiceDetails() {
  const [peopleCount, setPeopleCount] = useState(1);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { id } = useParams(); // Obtén el ID del servicio desde la URL
  const service = services.find((service) => service.id === parseInt(id)); // Busca el servicio correspondiente
  // Estado que controla si el sidebar está abierto
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Función para abrir el sidebar
  const openSidebar = () => setIsSidebarOpen(true);
  // Función para cerrar el sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const appointmentCalendarRef = useRef(null);
  const bookingFormRef = useRef(null);
  const userFormRef = useRef(null);

   // Función de utilidad para scroll suave
   const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Maneja el cambio en el campo de entrada
  /*const handlePeopleChange = (event) => {
    setPeopleCount(event.target.value);
  };*/


  const handlePeopleChange = () => {
    setPeopleCount(servicesToAppointment.persons);
  };



  // Función para manejar el clic en "Agregar Servicio"
  const handleAddService = () => {
    if (peopleCount < 1) {
      alert("La cantidad de personas no puede ser menor que 1");
      setPeopleCount(1);
      return;
    }

    openSidebar();
    servicesToAppointment.push(service);
  };

  const handleDateTimeSelect = (dateTime) => {
    setSelectedDateTime(dateTime);
    console.log("Fecha y hora seleccionada:", dateTime);
    // Pequeño delay para asegurar que el elemento existe
    setTimeout(() => scrollToRef(bookingFormRef), 100);
  };

  // Manejador para el envío del formulario
  const handleFormSubmit = (formData) => {
    // Aquí puedes manejar la lógica de envío del formulario
    
      // Asegurarse de que el servicio actual esté en el array de servicios
      if (!servicesToAppointment.some(s => s.id === service.id)) {
            servicesToAppointment.push({
            ...service,
            peopleCount: peopleCount
        });
    }

     // Calcular el precio total de todos los servicios
     const totalPrice = servicesToAppointment.reduce((total, service) => {
        // Si el servicio tiene peopleCount definido, usar ese valor, sino usar el peopleCount general
        const serviceCount = service.peopleCount || peopleCount;
        return total + (service.price * serviceCount);
    }, 0);

    // Crear nuevo appointment

    const newAppointment = {
      id: 1,
      name: formData.name,
      date: selectedDateTime.toISOString().split("T")[0],
      time: selectedDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),


    services: [...servicesToAppointment],
      
      
      // Agregar el servicio actual
      price: totalPrice,
      //persons: peopleCount,
      status: "pending",
      phone: formData.phone,
      email: formData.email,
    };

    // Agregar al arreglo de appointments
   

       // Asignar el nuevo appointment
    Object.assign(Appointmenttest, newAppointment);

    console.log("Nueva cita agregada:", Appointmenttest);
    console.log("Servicios incluidos:", servicesToAppointment);
    
    // Limpiar el arreglo de servicios después de crear la cita
    //servicesToAppointment.length = 0;
    
 
    setShowConfirmModal(true);
  };

  // Función para manejar el clic en "Continuar"
  const handleContinue = () => {
    setShowForm(true);
    // Pequeño delay para asegurar que el elemento existe
    setTimeout(() => scrollToRef(userFormRef), 100);
  };

  useEffect(() => {
    if (appointmentCalendarRef.current) {
      scrollToRef(appointmentCalendarRef);
    }
  }, []);

  if (!service) {
    return <p>Servicio no encontrado</p>; // Maneja el caso donde no se encuentra el servicio
  }

  const handleConfirmReservation = () => {
    setShowConfirmModal(false);
    setShowForm(false);
    navigate('/cart'); // Navegar al carrito después de confirmar
};

  return (
    <React.StrictMode>
      <div className="service-details">
        <img src={aboutPhoto} alt="Service" className="card-image" />
        <h2 className="service-title">{service.name}</h2>
        <p className="service-duration">
          <strong>Duración:</strong>60 min
        </p>
        <p className="service-price">
          <strong>Precio:</strong>$60
        </p>
        <p className="service-description">
          <strong>Descripción:</strong> {service.description}
        </p>
      </div>

      <div ref={appointmentCalendarRef}>
        <AppointmentCalendar onSelectDateTime={handleDateTimeSelect} />
      </div>

      {/* Mostrar el formulario solo si se ha seleccionado una fecha */}
      {selectedDateTime && (
        <div className="booking-form">

          
                <label className="service-people" ref={bookingFormRef}>
                <strong>Cantidad de personas:</strong>
                <input
                  type="number"
                  min="1"
                  value={peopleCount}
                  onChange={handlePeopleChange}
                  className="people-count-input"
                />
              </label>
            
                
                    
               
            
         
          <div className="buttons">
            <button onClick={handleAddService} className="add-service-button">
              Agregar otro serivicio
            </button>
            <button onClick={handleContinue} className="continue-button">
              Continuar
            </button>
          </div>
        </div>
      )}

      {showForm && (
         <div ref={userFormRef}>
         <UserForm onSubmit={handleFormSubmit} peopleCount={peopleCount} />
        </div>
      )}



      {/* Calendario de citas */}
      {/* Sidebar de Servicios */}

      {showConfirmModal && (
                <Modal
                    title="Reserva en Proceso"
                    message={`¡Gracias por tu reserva! Tu cita esta siendo procesada.
                             Por favor, revisa los detalles en el carrito.`}
                    onAccept={handleConfirmReservation}
                    showRejectButton={false} // Solo mostrar botón de aceptar
                />
            )}
      <ServiceSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </React.StrictMode>
  );
}

export default ServiceDetails;
