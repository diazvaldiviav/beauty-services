import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import services from '../../Data/Services';

const ManageServices = () => {
  const [servicesList, setServicesList] = useState(services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    imageUrl: '',
    category: '',
    status: 'active'
  });

  const handleAddService = (e) => {
    e.preventDefault();
    const serviceToAdd = {
      ...newService,
      id: servicesList.length + 1,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration)
    };

    setServicesList([...servicesList, serviceToAdd]);
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      imageUrl: '',
      category: '',
      status: 'active'
    });
    setIsModalOpen(false);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService(service);
    setIsModalOpen(true);
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    const updatedServices = servicesList.map(service => 
      service.id === editingService.id ? { 
        ...newService, 
        id: service.id,
        price: parseFloat(newService.price),
        duration: parseInt(newService.duration)
      } : service
    );
    setServicesList(updatedServices);
    setIsModalOpen(false);
    setEditingService(null);
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      imageUrl: '',
      category: '',
      status: 'active'
    });
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      setServicesList(servicesList.filter(service => service.id !== serviceId));
    }
  };

  const filteredServices = servicesList.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-services-container">
      {/* Header Section */}
      <div className="services-header">
        <div className="header-title">
          <h2>Gestión de Servicios</h2>
          <p>Administra los servicios ofrecidos en tu negocio</p>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="add-service-button"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Nuevo Servicio
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(service => (
              <tr key={service.id}>
                <td className="image-cell">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="service-image"
                  />
                </td>
                <td className="name-cell">{service.name}</td>
                <td className="description-cell">{service.description}</td>
                <td className="category-cell">
                  <span className="category-badge">
                    {service.category || 'Sin categoría'}
                  </span>
                </td>
                <td className="price-cell">S/ {service.price}</td>
                <td className="duration-cell">{service.duration} min</td>
                <td className="status-cell">
                  <span className={`status-badge ${service.status}`}>
                    {service.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditService(service)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component (mantener el existente) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingService ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
            <form onSubmit={editingService ? handleUpdateService : handleAddService}>
              <div className="form-section">
                <h4>Información del Servicio</h4>
                <div className="form-group">
                  <label>Nombre del Servicio</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    required
                    placeholder="Ej: Corte de Cabello"
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    required
                    placeholder="Describe el servicio..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Detalles del Servicio</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Categoría</label>
                    <select
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="hair">Cabello</option>
                      <option value="nails">Uñas</option>
                      <option value="makeup">Maquillaje</option>
                      <option value="spa">Spa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <select
                      value={newService.status}
                      onChange={(e) => setNewService({...newService, status: e.target.value})}
                      required
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Precio ($)</label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duración (minutos)</label>
                    <input
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Imagen del Servicio</h4>
                <div className="form-group">
                  <label>URL de la imagen</label>
                  <input
                    type="text"
                    value={newService.imageUrl}
                    onChange={(e) => setNewService({...newService, imageUrl: e.target.value})}
                    required
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                {newService.imageUrl && (
                  <div className="image-preview">
                    <img src={newService.imageUrl} alt="Vista previa" />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  {editingService ? 'Actualizar Servicio' : 'Crear Servicio'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                    setNewService({
                      name: '',
                      description: '',
                      price: '',
                      duration: '',
                      imageUrl: '',
                      category: '',
                      status: 'active'
                    });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;