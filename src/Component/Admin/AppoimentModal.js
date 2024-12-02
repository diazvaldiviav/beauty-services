import React, { useState} from 'react';
import { format } from 'date-fns';
import { 
  AVAILABLE_SERVICES, 
  SERVICE_PROVIDERS 
} from '../../Data/mockAppointments';

const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  appointment = null,
  isEditing = false 
}) => {
  const initialState = {
    client: '',
    service: '',
    provider: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    duration: 60,
    price: '',
    status: 'pending'
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedService, setSelectedService] = useState(null);



  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setFormData(prev => ({
        ...prev,
        service: service.name,
        duration: service.duration,
        price: service.price.toString(),
        provider: '' // Resetear el proveedor
      }));
    }
  };

  const getAvailableProviders = () => {
    if (!selectedService) return [];
    return SERVICE_PROVIDERS.filter(provider => 
      provider.services.includes(selectedService.id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      ...formData,
      id: appointment?.id || Date.now(),
      price: selectedService?.price.toString() || formData.price,
      status: formData.status || 'pending'
    };
    onSave(appointmentData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? 'Editar Cita' : 'Nueva Cita'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cliente:</label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Servicio:</label>
            <select
              value={selectedService?.id || ''}
              onChange={handleServiceChange}
              required
            >
              <option value="">Seleccione un servicio</option>
              {AVAILABLE_SERVICES.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - S/ {service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Proveedor:</label>
            <select
              value={formData.provider}
              onChange={(e) => setFormData({...formData, provider: e.target.value})}
              required
              disabled={!selectedService}
            >
              <option value="">Seleccione un proveedor</option>
              {getAvailableProviders().map(provider => (
                <option key={provider.id} value={provider.name}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora:</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Duración (minutos):</label>
            <input
              type="number"
              value={formData.duration}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Precio (S/):</label>
            <input
              type="text"
              value={formData.price}
              readOnly
            />
          </div>

          {isEditing && (
            <div className="form-group">
              <label>Estado:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
                <option value="completed">Completada</option>
              </select>
            </div>
          )}

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              {isEditing ? 'Guardar Cambios' : 'Crear Cita'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
