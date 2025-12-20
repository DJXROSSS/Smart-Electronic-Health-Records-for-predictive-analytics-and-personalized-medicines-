// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DoctorProfile from "./DoctorProfile";
import Settings from "./Settings";

function AppContent() {
  const navigate = useNavigate();
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
    navigate("/"); // Redirect to landing page
  };

  return (
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />

        {/* Signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard (protected route) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DoctorDashboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/doctorprofile"
          element={
            isAuthenticated ? <DoctorProfile handleLogout={handleLogout} /> : <Navigate to="/" />
          }
        />

        <Route
          path="/settings"
          element={isAuthenticated ? <Settings handleLogout={handleLogout} /> : <Navigate to="/" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
