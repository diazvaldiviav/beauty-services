import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Checkout({ appointment, onBack }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const depositAmount = appointment?.price * 0.5 || 0;

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatear número de tarjeta
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '')
                           .replace(/(\d{4})/g, '$1 ')
                           .trim()
                           .slice(0, 19);
    }
    // Formatear fecha de expiración
    else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '')
                           .replace(/(\d{2})(\d)/, '$1/$2')
                           .slice(0, 5);
    }
    // Formatear CVV
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card') {
      // Validar detalles de la tarjeta antes de mostrar el modal
      if (isCardValid()) {
        setShowConfirmModal(true);
      }
    } else if (paymentMethod) {
      setShowConfirmModal(true);
    }
  };

  const isCardValid = () => {
    return cardDetails.number.replace(/\s/g, '').length === 16 &&
           cardDetails.name.length > 3 &&
           cardDetails.expiry.length === 5 &&
           cardDetails.cvv.length === 3;
  };

  const handleConfirmPayment = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/profile');
  };

  if (!appointment) {
    return <div className="checkout-container">No hay reserva para procesar</div>;
  }

  return (
    <div className="checkout-container">
      <button onClick={onBack} className="back-button">
        ← Volver al carrito
      </button>
      
      <h2>Checkout</h2>
      
      <div className="checkout-summary">
        <h3>Resumen de la Reserva</h3>
        <div className="summary-details">
          <p><strong>Fecha:</strong> {appointment.date}</p>
          <p><strong>Hora:</strong> {appointment.time}</p>
          <p><strong>Total:</strong> ${appointment.price}</p>
          <p><strong>Depósito requerido (50%):</strong> ${depositAmount}</p>
        </div>
      </div>

      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <h3>Método de Pago</h3>
        <div className="payment-methods">
          <label className="payment-method">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="method-details">
              <i className="fas fa-credit-card"></i>
              Tarjeta de Crédito/Débito
            </span>
          </label>

          <label className="payment-method">
            <input
              type="radio"
              name="paymentMethod"
              value="yape"
              checked={paymentMethod === 'yape'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="method-details">
              <i className="fas fa-mobile-alt"></i>
              Yape
            </span>
          </label>

          <label className="payment-method">
            <input
              type="radio"
              name="paymentMethod"
              value="plin"
              checked={paymentMethod === 'plin'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="method-details">
              <i className="fas fa-mobile-alt"></i>
              Plin
            </span>
          </label>
        </div>

        {/* Formulario de tarjeta */}
        {paymentMethod === 'card' && (
          <div className="card-form">
            <div className="form-group">
              <label>Número de Tarjeta</label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="form-group">
              <label>Nombre en la Tarjeta</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardInputChange}
                placeholder="NOMBRE APELLIDO"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Expiración</label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="confirm-payment-btn"
          disabled={!paymentMethod || (paymentMethod === 'card' && !isCardValid())}
        >
          Confirmar Pago
        </button>
      </form>

      {showConfirmModal && (
        <Modal
          title="Confirmar Pago"
          message={`¿Estás seguro de realizar el depósito de $${depositAmount} mediante ${
            paymentMethod === 'card' ? 'tarjeta terminada en ' + cardDetails.number.slice(-4) : paymentMethod
          }?`}
          onAccept={handleConfirmPayment}
          onReject={() => setShowConfirmModal(false)}
        />
      )}

      {showSuccessModal && (
        <Modal
          title="¡Pago Exitoso!"
          message="Tu reserva ha sido confirmada. Recibirás un correo con los detalles."
          onAccept={handleSuccessClose}
          onReject={handleSuccessClose}
          showReject={false}
        />
      )}
    </div>
  );
}

export default Checkout;