// src/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Heart, Activity } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block p-4 bg-blue-600 text-white rounded-2xl shadow-lg mb-6">
          <Stethoscope size={48} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Welcome to SmartEHR
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Revolutionizing healthcare with predictive analytics and personalized medicine.
          Access patient records, view AI-powered insights, and provide better care.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-xl"
        >
          Doctor Login
        </button>
      </div>
      <div className="mt-16 flex gap-8 text-gray-600">
        <div className="flex items-center gap-3">
          <Heart className="text-blue-500" />
          <span>Predictive Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          <Activity className="text-blue-500" />
          <span>Personalized Care</span>
        </div>
      </div>
    </div>
  );
}