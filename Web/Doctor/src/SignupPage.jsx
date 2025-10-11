// src/SignupPage.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, LogIn, Stethoscope, User, Lock, Mail, UserCircle, AlertCircle, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/40 rounded-full blur-3xl animate-pulse -z-10"></div>

      <div className="grid lg:grid-cols-2 items-center max-w-4xl w-full">
        {/* Left Column: Branding */}
        <div className="hidden lg:flex flex-col justify-center items-start px-8 animate-fade-in-right">
          <div className="flex items-center gap-4 mb-4">
            <Stethoscope className="text-indigo-400" size={48} />
            <span className="text-3xl font-bold tracking-tight">SmartEHR</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">
            Join the Future of Healthcare
          </h1>
          <p className="text-slate-400 mt-2">
            Create your account to unlock predictive insights and streamline patient care.
          </p>
        </div>

        {/* Right Column: Signup Form */}
        <div className="w-full bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in-left">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Create Doctor Account</h2>
            <p className="text-slate-400 mt-1">Get started in just a few steps.</p>
          </div>

          <form onSubmit={onFormSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="username" type="text" onChange={handleChange} placeholder="Username" required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>

            {/* Full Name Input */}
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="name" type="text" onChange={handleChange} placeholder="Full Name" required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="email" type="email" onChange={handleChange} placeholder="Email Address" required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="password" type="password" onChange={handleChange} placeholder="Password" required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-900/50 text-red-400 text-sm p-3 rounded-lg">
                <AlertCircle size={18} /><span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 bg-green-900/50 text-green-400 text-sm p-3 rounded-lg">
                <CheckCircle size={18} /><span>{success}</span>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <UserPlus size={18} />}
            </button>
          </form>
          
          <div className="text-center mt-6">
              <p className="text-sm text-slate-400">Already have an account?{' '}
                  <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
                      Login Now
                  </Link>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}