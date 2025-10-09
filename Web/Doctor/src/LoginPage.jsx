// src/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, LogIn } from 'lucide-react';

export default function LoginPage({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy credentials as requested
  const DUMMY_USER = 'doctor';
  const DUMMY_PASS = 'password123';

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (username === DUMMY_USER && password === DUMMY_PASS) {
      setError('');
      handleLogin();
      navigate('/dashboard'); // Redirect on successful login
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-blue-600 text-white rounded-full mb-4">
            <Stethoscope size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Doctor Login</h2>
          <p className="text-gray-500">Access your SmartEHR dashboard.</p>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., doctor"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g., password123"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}