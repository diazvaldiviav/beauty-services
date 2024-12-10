import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Component/Common/Home';
import LoadingSpinner from '../Component/Common/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Lazy loading de componentes existentes
const LazyCart = lazy(() => import('../Component/Common/Cart'));
const LazyServiceDetails = lazy(() => import('../Component/Common/ServiceDetails'));
const LazyCheckout = lazy(() => import('../Component/Common/Checkout'));
const LazyLogin = lazy(() => import('../Component/Authentication/Login'));
const LazyRegister = lazy(() => import('../Component/Authentication/Register'));
const LazyAdminDashboard = lazy(() => import('../Component/Admin/Dashboard'));

// Componente para rutas protegidas de admin
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin()) return <Navigate to="/login" replace />;

  return children;
};






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

           {/* Rutas de admin */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <LazyAdminDashboard />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <LazyAdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </Suspense>
    
  );
};

export default Routers;
