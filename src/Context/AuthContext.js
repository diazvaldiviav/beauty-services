import React, { createContext, useState, useContext,} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    // Aquí implementarías la lógica de registro
    // Por ahora, simularemos un registro exitoso
    const newUser = {
      ...userData,
      id: Date.now(), // Simulamos un ID único
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
