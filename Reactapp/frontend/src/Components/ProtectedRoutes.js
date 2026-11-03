import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('userRole'); // Get the role from localStorage

  if (!token || role !== 'admin') {
    return <Navigate to="/" />; // Redirect to home page if not an admin
  }

  return children;
};

export default ProtectedRoute;
