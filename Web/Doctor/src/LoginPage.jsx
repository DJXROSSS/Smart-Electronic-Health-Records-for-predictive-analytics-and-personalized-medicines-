// src/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Stethoscope, LogIn, UserPlus, User, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        handleLogin();
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/40 rounded-full blur-3xl animate-pulse -z-10"></div>

      <div className="grid lg:grid-cols-2 items-center max-w-4xl w-full">
        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center items-start px-8 animate-fade-in-right">
          <div className="flex items-center gap-4 mb-4">
            <Stethoscope className="text-indigo-400" size={48} />
            <span className="text-3xl font-bold tracking-tight">SmartEHR</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">
            Welcome Back, Doctor
          </h1>
          <p className="text-slate-400 mt-2">
            Securely access your dashboard to continue providing exceptional care.
          </p>
        </div>

        {/* Right Column: Login Form */}
        <div className="w-full bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in-left">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Log in to your Account</h2>
            <p className="text-slate-400 mt-1">Enter your credentials below.</p>
          </div>

          <form onSubmit={onFormSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-900/50 text-red-400 text-sm p-3 rounded-lg">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && <LogIn size={18} />}
            </button>
          </form>

          {/* Signup redirect */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-indigo-400 font-semibold hover:underline"
              >
                Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}