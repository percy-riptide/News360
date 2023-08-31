import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  // Add your authentication logic here
  const isAuthenticated = sessionStorage.getItem("email"); // Replace with your authentication check

  return isAuthenticated ? (
  <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
