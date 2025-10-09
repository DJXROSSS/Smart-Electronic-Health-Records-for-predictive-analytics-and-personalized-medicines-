import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, LogIn } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Use the correct endpoint from your updated routes
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="p-3 bg-blue-600 text-white rounded-full mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Doctor Account</h2>
          <p className="text-gray-500">Join SmartEHR to access your dashboard.</p>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-4">
          {/* Form fields for all required data */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Username</label>
            <input name="username" type="text" onChange={handleChange} placeholder="Choose a username" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <input name="name" type="text" onChange={handleChange} placeholder="Enter your full name" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input name="email" type="email" onChange={handleChange} placeholder="Enter your email" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input name="password" type="password" onChange={handleChange} placeholder="Choose a secure password" className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center">{success}</p>}

          <button type="submit" className="w-full flex justify-center items-center gap-2 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            <UserPlus size={18} />
            Create Account
          </button>
        </form>
        <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Login Now
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
