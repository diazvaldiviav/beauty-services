import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appointmenttest from "../../Data/Appoinmenttest";
import Modal from "./Modal";
import Checkout from "./Checkout"; // Importamos el nuevo componente

function Cart() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false); // Nuevo estado

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReservar = () => {
    setShowDepositModal(true);
  };

  const handleReservarDeposito = () => {
    setShowDepositModal(false);
    setShowCheckout(true); // En lugar de navegar, mostramos el checkout
  };

  const handleEliminar = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    Object.keys(Appointmenttest).forEach((key) => {
      if (Array.isArray(Appointmenttest[key])) {
        Appointmenttest[key] = [];
      } else if (typeof Appointmenttest[key] === "number") {
        Appointmenttest[key] = 0;
      } else {
        Appointmenttest[key] = "";
      }
    });

    setShowDeleteModal(false);
    window.location.reload();
  };

  // Si showCheckout es true, mostramos el componente Checkout
  if (showCheckout) {
    return <Checkout 
      appointment={Appointmenttest}
      onBack={() => setShowCheckout(false)} // Permite volver al carrito
    />;
  }

  return (
    <div className="cart-container">
      <h2>Mi Reserva</h2>
      {Appointmenttest && Appointmenttest.name ? (
        <div className="appointment-card">
          <div className="appointment-header">
            <h3>Reserva #{Appointmenttest.id}</h3>
            <span
              className={`status-badge ${Appointmenttest.status.toLowerCase()}`}
            >
              {Appointmenttest.status === "confirmed"
                ? "Confirmada"
                : Appointmenttest.status === "pending"
                ? "Pendiente"
                : Appointmenttest.status === "completed"
                ? "Completada"
                : Appointmenttest.status === "cancelled"
                ? "Cancelada"
                : Appointmenttest.status}
            </span>
          </div>

          <div className="appointment-details">
            <p>
              <strong>Cliente:</strong> {Appointmenttest.name}
            </p>
            <p>
              <strong>Fecha:</strong> {Appointmenttest.date}
            </p>
            <p>
              <strong>Hora:</strong> {Appointmenttest.time}
            </p>
            <p>
              <strong>Teléfono:</strong> {Appointmenttest.phone}
            </p>
            {Appointmenttest.email && (
              <p>
                <strong>Email:</strong> {Appointmenttest.email}
              </p>
            )}

            <div className="services-list">
              <strong>Servicios:</strong>
              <ul>
                {Appointmenttest.services &&
                  Appointmenttest.services.map((service, index) => (
                    <li key={index}>
                      {service.name} - ${service.price} - {service.peopleCount}{" "}
                      personas
                    </li>
                  ))}
              </ul>
            </div>

            <p className="total-price">
              <strong>Total:</strong> ${Appointmenttest.price}
            </p>
          </div>

          <div className="cart-actions">
            <button className="reservar-button" onClick={handleReservar}>
              Depositar y reservar
            </button>
            <button className="eliminar-button" onClick={handleEliminar}>
              Eliminar Reserva
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>No hay reserva confirmada</p>
          <button className="reservar-button" onClick={() => navigate("/services")}>
            Hacer una Reserva
          </button>
        </div>
      )}

      {/* Modal para eliminar */}
      {showDeleteModal && (
        <Modal
          title="Eliminar Reserva"
          message="¿Estás seguro de que deseas eliminar esta reserva?"
          onAccept={handleConfirmDelete}
          onReject={() => setShowDeleteModal(false)}
        />
      )}

      {/* Modal para depósito */}
      {showDepositModal && (
        <Modal
          title="Depósito del 50%"
          message={`Estás a punto de hacer un depósito de $${
            Appointmenttest.price * 0.5
          }. 
           Recuerda que el depósito es reembolsable en caso de cancelación 
           de la reserva antes de las 48 horas.`}
          onAccept={handleReservarDeposito}
          onReject={() => setShowDepositModal(false)}
        />
      )}
    </div>
  );
}

export default Cart;