import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = (credentials) => {
    // Aquí irá la lógica de autenticación del administrador
    // Por ahora, simulamos una autenticación básica
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);