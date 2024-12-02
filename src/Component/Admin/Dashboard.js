import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaClock, FaCut, FaBell, FaCog, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import Calendar from './Calendar';
import ManageServices from './ManageServices';
import ManageUsers from './ManageUsers';
import { useAuth } from '../../Context/AuthContext';
import "../../Styles/Admin.css"

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();
  


  // Función para renderizar el contenido según el menú activo
  const renderContent = () => {
    switch (activeMenu) {
      case 'calendar':
        return <Calendar searchQuery={searchQuery} />;
      case 'services':
        return <ManageServices searchQuery={searchQuery} />;
      case 'users':
        return <ManageUsers searchQuery={searchQuery} />;
      case 'schedule':
        return <div>Gestión de Horarios (En desarrollo)</div>;
      default:
        return <Calendar searchQuery={searchQuery} />;
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Beauty Services</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeMenu === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveMenu('calendar')}
          >
            <FaCalendarAlt /> <span>Citas</span>
          </button>
          
          <button 
            className={`nav-item ${activeMenu === 'services' ? 'active' : ''}`}
            onClick={() => setActiveMenu('services')}
          >
            <FaCut /> <span>Servicios</span>
          </button>
          
          <button 
            className={`nav-item ${activeMenu === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveMenu('schedule')}
          >
            <FaClock /> <span>Horarios</span>
          </button>
          
          <button 
            className={`nav-item ${activeMenu === 'users' ? 'active' : ''}`}
            onClick={() => setActiveMenu('users')}
          >
            <FaUsers /> <span>Usuarios</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="search-bar">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar citas, servicios o usuarios..." 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="header-actions">
            <button className="icon-button">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <button className="icon-button">
              <FaCog />
            </button>
            <button className="profile-button" onClick={logout}>
              <span>Admin</span>
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
              {renderContent()}
             
          {/* Otros componentes según el menú activo */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
