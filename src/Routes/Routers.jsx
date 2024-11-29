import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Component/Home';
import LoadingSpinner from '../Component/LoadingSpinner';
import {Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Lazy loading de componentes existentes
const LazyCart = lazy(() => import('../Component/Cart'));
const LazyServiceDetails = lazy(() => import('../Component/ServiceDetails'));
const LazyCheckout = lazy(() => import('../Component/Checkout'));
const LazyLogin = lazy(() => import('../Component/Login'));
const LazyRegister = lazy(() => import('../Component/Register'));

// Componente PrivateRoute para proteger rutas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

 




const Routers = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<LazyCart />} />
        <Route path="/Services/:id" element={<LazyServiceDetails />} /> 
        <Route path="/Checkout" element={<LazyCheckout />} />
        <Route path="/login" element={<LazyLogin />} />
        <Route path="/register" element={<LazyRegister />} />

         {/* Rutas protegidas */}
         <Route path="/Cart" element={
          <PrivateRoute>
            <LazyCart />
          </PrivateRoute>
        } />
        <Route path="/Services/:id" element={<LazyServiceDetails />} />
        <Route path="/Checkout" element={
          <PrivateRoute>
            <LazyCheckout />
          </PrivateRoute>
        } />
      </Routes>
    </Suspense>
    
  );
};

export default Routers;
