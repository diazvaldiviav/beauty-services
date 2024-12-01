import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../Context/AdminContext';
import LoadingSpinner from '../Component/LoadingSpinner';

// Lazy loading de componentes administrativos
const AdminDashboard = lazy(() => import('../Component/Admin/Dashboard'));
const ManageServices = lazy(() => import('../Component/Admin/ManageServices'));
const ManageAppointments = lazy(() => import('../Component/Admin/ManageAppointments'));
const ManageSchedule = lazy(() => import('../Component/Admin/Calendar'));
const ManageUsers = lazy(() => import('../Component/Admin/ManageUsers'));
const AdminLogin = lazy(() => import('../Component/Admin/AdminLogin'));

// Componente para proteger rutas administrativas
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/services" element={
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        } />
        <Route path="/admin/appointments" element={
          <AdminRoute>
            <ManageAppointments />
          </AdminRoute>
        } />
        <Route path="/admin/schedule" element={
          <AdminRoute>
            <ManageSchedule />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        } />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;