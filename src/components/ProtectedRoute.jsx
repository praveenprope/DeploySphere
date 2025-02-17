// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated !== "true") {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component (the protected page)
  return children;
}

export default ProtectedRoute;
