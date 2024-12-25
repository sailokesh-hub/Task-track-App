import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  // Check if the user is authenticated
  const isAuthenticated = Cookies.get('jwt_token') ? true : false;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the element (HomePage)
  return element;
};

export default ProtectedRoute;
