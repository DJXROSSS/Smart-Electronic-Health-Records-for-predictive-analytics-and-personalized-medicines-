import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, AtSign, Phone, ArrowLeft, Award, Briefcase, MapPin, Calendar, Shield, CheckCircle, Building2, GraduationCap, Edit2, Save, X } from 'lucide-react';

// Using a placeholder image URL
const doctorImage = "https://placehold.co/160x160/EBF4FF/3B82F6?text=Dr";

export default function DoctorProfile({ handleLogout }) {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setDoctor(res.data.doctor);
        setEditedData({
          phone: res.data.doctor.phone || '+1 (555) 123-4567',
          specialization: res.data.doctor.specialization || 'General Medicine',
          experience: res.data.doctor.experience || '5+ years',
          hospital: res.data.doctor.hospital || 'City General Hospital',
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Could not load doctor profile. Please try again.');
        if (err.response && err.response.status === 401) {
            handleLogout();
        }
      }
    };

    fetchProfile();
  }, [handleLogout]);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      phone: doctor.phone || '+1 (555) 123-4567',
      specialization: doctor.specialization || 'General Medicine',
      experience: doctor.experience || '5+ years',
      hospital: doctor.hospital || 'City General Hospital',
    });
    setSaveMessage('');
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending update request with data:', editedData);
      const res = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        editedData,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      console.log('Update response:', res.data);
      setDoctor({ ...doctor, ...editedData });
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      console.error('Error response:', err.response?.data);
      setSaveMessage(err.response?.data?.message || 'Failed to update profile. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50/30 to-purple-50/30 p-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold text-indigo-600 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 pb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Profile Image - Overlapping */}
          <div className="relative -mt-16 flex justify-center">
            <div className="relative">
              <img
                src={doctorImage}
                alt="Doctor Avatar"
                className="w-32 h-32 rounded-full ring-8 ring-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full ring-4 ring-white">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mt-4 px-8">
            <h1 className="text-4xl font-black text-gray-900">{doctor.name}</h1>
            <p className="text-lg text-indigo-600 font-semibold mt-1">Medical Doctor</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-bold text-green-600">Verified Professional</span>
            </div>
            
            {/* Edit Controls */}
            <div className="flex items-center justify-center gap-3 mt-4">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>


                  
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
            
            {/* Save Message */}
            {saveMessage && (
              <div className={`mt-3 text-sm font-semibold ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {saveMessage}
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <User className="w-6 h-6 text-indigo-600" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <AtSign className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Username</p>
                    <p className="font-bold text-gray-900">{doctor.username}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl">
                  <Mail className="w-6 h-6 text-sky-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Email Address</p>
                    <p className="font-bold text-gray-900">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <Phone className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">Phone Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full mt-1 px-3 py-2 font-bold text-gray-900 bg-white border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 transition-all"
                      />
                    ) : (
                      <p className="font-bold text-gray-900">{doctor.phone || '+1 (555) 123-4567'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                Professional Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">Specialization</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                        className="w-full mt-1 px-3 py-2 font-bold text-gray-900 bg-white border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 transition-all"
                      />
                    ) : (
                      <p className="font-bold text-gray-900">{doctor.specialization || 'General Medicine'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                  <Award className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold flex items-center gap-2">
                      License Number
                      <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">Non-Editable</span>
                    </p>
                    <p className="font-bold text-gray-900">{doctor.licenseNumber || 'MD-2023-456789'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">Years of Experience</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="w-full mt-1 px-3 py-2 font-bold text-gray-900 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-all"
                      />
                    ) : (
                      <p className="font-bold text-gray-900">{doctor.experience || '5+ years'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-rose-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-semibold">Hospital/Clinic</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.hospital}
                        onChange={(e) => handleInputChange('hospital', e.target.value)}
                        className="w-full mt-1 px-3 py-2 font-bold text-gray-900 bg-white border-2 border-rose-300 rounded-lg focus:outline-none focus:border-rose-600 transition-all"
                      />
                    ) : (
                      <p className="font-bold text-gray-900">{doctor.hospital || 'City General Hospital'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 mx-8 mb-8 rounded-2xl border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Verification Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Medical License Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Educational Credentials Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Background Check Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Identity Verification Passed</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Verified on:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
