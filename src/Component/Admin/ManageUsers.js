import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUserCircle } from 'react-icons/fa';
import users from '../../Data/Users';
import UserModal from './UserModal';
import { toast } from 'react-toastify';
import ConfirmationUserModal from './ConfirmationUserModal';

const ManageUsers = () => {
  const [usersList, setUsersList] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = usersList.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };


  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsersList(prevUsers => 
        prevUsers.filter(user => user.id !== userToDelete.id)
      );
      toast.success(`Usuario ${userToDelete.name} eliminado exitosamente`);
      setShowConfirmModal(false);
      setUserToDelete(null);
    }
  };


  const handleSaveUser = (userData) => {
    console.log('Datos del nuevo usuario:', userData);
    if (editingUser) {
      // Actualizar usuario existente
      setUsersList(prevUsers =>
        prevUsers.map(user =>
          user.id === editingUser.id ? { ...userData, id: user.id } : user
        )
      );
    } else {
      // Crear nuevo usuario
      setUsersList(prevUsers => [...prevUsers, { ...userData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="manage-users-container">
      {/* Header Section */}
      <div className="users-header">
        <div className="header-title">
          <h2>Gestión de Usuarios</h2>
          <p>Administra los usuarios del sistema</p>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="add-user-button"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Última Conexión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="user-cell">
                  <div className="user-info">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="user-avatar"
                      />
                    ) : (
                      <FaUserCircle className="default-avatar" />
                    )}
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-username">@{user.username}</span>
                    </div>
                  </div>
                </td>
                <td className="email-cell">{user.email}</td>
                <td className="role-cell">
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td className="status-cell">
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td className="last-login-cell">
                  {user.lastLogin || 'Nunca'}
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-button edit"
                    onClick={() => handleEditUser(user)}
                    title="Editar usuario"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDeleteClick(user)}
                    title="Eliminar usuario"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación (opcional) */}
      <div className="pagination">
        {/* Implementar paginación si es necesario */}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
          <UserModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          user={editingUser}
          isEditing={!!editingUser}
        />
      )}

       {/* Modal de Confirmación */}
       {/* Modal de Confirmación */}
       {showConfirmModal && userToDelete && (
        <ConfirmationUserModal
          title="Eliminar Usuario"
          message={`¿Estás seguro de que deseas eliminar al usuario ${userToDelete.name}? Esta acción no se puede deshacer.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirmModal(false);
            setUserToDelete(null);
          }}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
    </div>
  );
};

export default ManageUsers;