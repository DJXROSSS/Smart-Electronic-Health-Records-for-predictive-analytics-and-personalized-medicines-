// src/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Heart, Activity, ArrowRight, BrainCircuit, BarChart3 } from 'lucide-react';

// A small helper component for feature cards to keep the code clean
const FeatureCard = ({ icon, title, description }) => (
  <div className="relative p-6 bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-50 group-hover:opacity-80 transition-opacity"></div>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-indigo-600/30 border border-indigo-500/50 rounded-lg text-indigo-400">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  </div>
);


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white overflow-hidden">
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-600/50 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-600/40 rounded-full blur-3xl animate-pulse -z-10"></div>
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-10">
        <div className="flex items-center gap-3">
          <Stethoscope className="text-indigo-400" size={28} />
          <span className="text-xl font-bold tracking-tight">ᴹᴱᴰᴵCONNECT</span>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="min-h-screen grid lg:grid-cols-2 items-center justify-center p-8 lg:p-16 gap-16">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left z-10 animate-fade-in-right">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            The Future of Healthcare is Here.
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mb-10">
            SmartEHR leverages predictive analytics to provide AI-powered insights, helping you deliver exceptional, personalized patient care.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-105"
          >
            <span>Doctor Portal Login</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-16 w-full max-w-lg">
            <FeatureCard 
              icon={<BrainCircuit size={24} />}
              title="Predictive Analytics"
              description="Anticipate health risks before they arise."
            />
            <FeatureCard 
              icon={<BarChart3 size={24} />}
              title="Data-Driven Insights"
              description="Make informed decisions with smart data."
            />
          </div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="relative hidden lg:flex items-center justify-center h-full animate-fade-in-left">
           <div className="absolute w-[500px] h-[500px] bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center">
             <div className="absolute w-[350px] h-[350px] bg-slate-800/60 border border-slate-600/80 rounded-full flex items-center justify-center">
               <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-indigo-600 to-sky-500 rounded-full shadow-2xl shadow-indigo-500/50">
               </div>
             </div>
           </div>
           <Heart className="absolute text-white/80 w-16 h-16 animate-pulse" style={{ animationDuration: '3s' }} />
           <Activity className="absolute text-white/60 w-12 h-12 top-1/4 left-1/4 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
           <Stethoscope className="absolute text-white/50 w-20 h-20 bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
        </div>
      </main>
    </div>
  );
}