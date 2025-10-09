import React from 'react';
import DoctorDashboard from './DoctorDashboard';

function App() {
  return (
    // Set a background color for the whole page
    <div className="bg-gray-100 min-h-screen"> 
      <header className="bg-gray-800 p-5 shadow-md">
        <h1 className="text-2xl text-white text-center font-bold">Smart EHR Dashboard</h1>
      </header>
      <main className="p-5 md:p-8">
        <DoctorDashboard />
      </main>
    </div>
  );
}

export default App;