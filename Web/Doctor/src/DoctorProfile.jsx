import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, AtSign, Phone, LogOut, ArrowLeft } from 'lucide-react';

// Using a placeholder image URL
const doctorImage = "https://placehold.co/128x128/EBF4FF/3B82F6?text=Dr";

export default function DoctorProfile({ handleLogout }) {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        handleLogout(); // Logout if no token is found
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { 'x-auth-token': token },
        });
        setDoctor(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Could not load doctor profile. Please try again.');
        // If token is invalid, log out the user
        if (err.response && err.response.status === 401) {
            handleLogout();
        }
      }
    };

    fetchProfile();
  }, [handleLogout]);

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 relative">
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex flex-col items-center pt-8">
          <img
            src={doctorImage}
            alt="Doctor Avatar"
            className="w-32 h-32 rounded-full ring-4 ring-offset-4 ring-blue-500 shadow-md"
          />
          <h2 className="text-3xl font-bold text-gray-800 mt-4">{doctor.name}</h2>
          <p className="text-gray-500">Doctor</p>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <AtSign className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-semibold text-gray-700">{doctor.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-700">{doctor.email}</p>
            </div>
          </div>
           {/* You can add a phone number to your doctor model and display it here */}
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-semibold text-gray-700">(123) 456-7890</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex justify-center items-center gap-2 mt-6 p-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
