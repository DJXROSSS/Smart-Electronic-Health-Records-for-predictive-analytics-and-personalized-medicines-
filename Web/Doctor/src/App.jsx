// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

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
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        
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
        
        {/* A catch-all route to redirect any other path to the landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;