// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to be called from LoginPage on successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to be called from DoctorDashboard to log out
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // also clear token
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />

        {/* Signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard (protected route) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DoctorDashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
