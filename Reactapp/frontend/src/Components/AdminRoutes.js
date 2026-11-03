import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('userRole');

  if (!token || role !== 'admin') {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
