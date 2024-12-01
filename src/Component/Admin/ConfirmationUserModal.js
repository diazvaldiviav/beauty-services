import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConfirmationUserModal = ({ 
  title = "Confirmar Acción",
  message, 
  onConfirm, 
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onCancel}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions">
            <button 
              className="cancel-btn" 
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button 
              className="confirm-btn" 
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationUserModal;