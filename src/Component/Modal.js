import React from 'react';
import '../Styles/Style.css';

function Modal({ title, message, onAccept, onReject, showRejectButton = true }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button 
                        className="modal-button accept-button"
                        onClick={onAccept}
                    >
                        Aceptar
                    </button>
                    {showRejectButton && (
                        <button 
                            className="modal-button reject-button"
                            onClick={onReject}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;