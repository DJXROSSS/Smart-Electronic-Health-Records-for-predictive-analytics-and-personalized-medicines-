import React, { useState, useEffect, useRef } from "react"; // Added useRef
import axios from 'axios';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Activity, Heart, Droplet, AlertTriangle, CheckCircle2,
  User, FileText, BrainCircuit, BarChart3, Stethoscope, Thermometer,
  Weight, Ruler, Pill, BookOpen, ListChecks, CalendarDays, Users, LogOut, Mail
} from "lucide-react";
import doctorAvatar from './assets/doctor-avatar.png'; 
// --- Mock Data (No changes) ---
const mockPatientData = {
  "PID-001": {
    id: "PID-001",
    name: "Ayush Sharma",
    age: 45,
    gender: "Male",
    details: {
      bloodPressure: "130/85 mmHg",
      glucose: "150 mg/dL",
      heartRate: "78 bpm",
      temperature: "98.4°F",
      weight: "82 kg",
      height: "175 cm",
      notes: "Occasional fatigue and dizziness reported over the past month. Patient seems receptive to lifestyle changes but may need consistent follow-ups to ensure adherence.",
      medicalHistory: ["Prediabetes (2023)","Family history of Type 2 Diabetes","Mild hypertension",],
      currentMedications: ["Metformin 500mg daily", "Lisinopril 10mg daily"],
      doctorsRecommendations: ["Increase physical activity to 150 minutes per week","Reduce carbohydrate intake", "Monitor blood glucose levels twice weekly"],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis: "Based on current glucose levels, blood pressure readings, age, and family history, the AI model predicts an 82% likelihood of Type 2 Diabetes development within the next 5 years.",
      keyFactors: ["Elevated Fasting Glucose (150 mg/dL)","Age Factor (45 years)","Hypertension (130/85)","Family History of Diabetes",],
    },
  },
  "PID-002": {
    id: "PID-002",
    name: "Riya Gupta",
    age: 32,
    gender: "Female",
    details: {
      bloodPressure: "110/70 mmHg",
      glucose: "95 mg/dL",
      heartRate: "72 bpm",
      temperature: "98.2°F",
      weight: "62 kg",
      height: "165 cm",
      notes: "Annual check-up. No current health concerns reported. Patient is proactive about health and diet.",
      medicalHistory: ["No significant medical history"],
      currentMedications: ["Multivitamin daily"],
      doctorsRecommendations: ["Maintain balanced diet", "Continue annual check-ups"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Patient demonstrates optimal health markers across all measured parameters. The AI model indicates minimal risk for metabolic or cardiovascular conditions.",
      keyFactors: ["Optimal Blood Pressure","Healthy Glucose Levels","Normal BMI","Active Lifestyle"],
    },
  },
};

const mockAppointments = {
  "2025-10-10": ["PID-001", "PID-002"],
  "2025-10-09": ["PID-002"],
  "2025-10-08": ["PID-001"],
};

// --- Helper Components (No changes) ---
const InfoCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
    <div className="flex items-center gap-3 p-4 border-b bg-gray-50/80">
      <Icon className="w-5 h-5 text-gray-500" />
      <h3 className="text-md font-bold text-gray-700">{title}</h3>
    </div>
    <div className="p-4 text-gray-600 space-y-3">{children}</div>
  </div>
);

const VitalSign = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
    <Icon className="w-6 h-6 text-indigo-500 flex-shrink-0" />
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-md font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionableCard = ({ title, icon: Icon, items, setItems, placeholder }) => (
    <InfoCard title={title} icon={Icon}>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
        <div className="mt-4">
            <input 
                type="text" 
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm bg-gray-100 border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                        setItems([...items, e.currentTarget.value]);
                        e.currentTarget.value = '';
                    }
                }}
            />
        </div>
    </InfoCard>
);

export default function DoctorDashboard({ handleLogout }) {
  const navigate = useNavigate();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // --- NEW: State and Ref for profile card ---
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileCardRef = useRef(null);
  
  const patient = selectedPatientId ? mockPatientData[selectedPatientId] : null;

  const [notes, setNotes] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [medications, setMedications] = useState([]);

  // Fetch doctor's profile for header (No changes to logic)
  // Fetch doctor's profile for header (CORRECTED)
  useEffect(() => {
    const fetchDoctorProfile = async () => {
       // 1. Get token from local storage
       const token = localStorage.getItem('token');
       if (!token) {
           handleLogout();
           return;
       }
       
       try {
           // 2. Make the API call to the CORRECT endpoint with the CORRECT headers
           const res = await axios.get('http://localhost:5000/api/auth/me', {
               headers: { 
                   // The header key is 'Authorization' and the value must start with 'Bearer '
                   'Authorization': `Bearer ${token}` 
               }
           });

           // 3. Set the state with the CORRECT data structure (res.data.doctor)
           setDoctorProfile(res.data.doctor);

       } catch (error) {
           console.error("Failed to fetch profile", error);
           // If the token is invalid or expired, the backend will send a 401 error
           if (error.response && error.response.status === 401) {
               handleLogout();
           }
       }
    };
    fetchDoctorProfile();
  }, [handleLogout]);

  useEffect(() => {
    if (patient) {
      setNotes(patient.details.notes || "");
      setRecommendations(patient.details.doctorsRecommendations || []);
      setMedications(patient.details.currentMedications || []);
    }
  }, [patient]);

  // --- NEW: Effect to close profile card on outside click ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileCardRef]);
  
  const getRiskClasses = (risk) => {
    switch (risk) {
      case "High": return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", ring: "ring-red-500" };
      case "Medium": return { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", ring: "ring-yellow-500" };
      default: return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", ring: "ring-green-500" };
    }
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const appointmentsOnSelectedDate = mockAppointments[formatDate(selectedDate)] || [];

  const renderPatientDetail = () => (
    // ... No changes inside this function
    <div className="animate-fade-in">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6 mb-8">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white ring-4 ring-indigo-100">
                        <User className="w-12 h-12" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-bold text-white ${getRiskClasses(patient.aiPrediction.risk).bg.replace('50', '600')}`}>
                        {patient.aiPrediction.risk} Risk
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">{patient.name}</h2>
                    <p className="text-lg text-gray-500">{patient.age} years, {patient.gender} &middot; ID: {patient.id}</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <InfoCard title="Vitals" icon={Activity}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <VitalSign label="Heart Rate" value={patient.details.heartRate} icon={Heart} />
                        <VitalSign label="Glucose" value={patient.details.glucose} icon={Droplet} />
                        <VitalSign label="Blood Pressure" value={patient.details.bloodPressure} icon={Stethoscope} />
                        <VitalSign label="Temperature" value={patient.details.temperature} icon={Thermometer} />
                        <VitalSign label="Weight" value={patient.details.weight} icon={Weight} />
                        <VitalSign label="Height" value={patient.details.height} icon={Ruler} />
                    </div>
                </InfoCard>

                <InfoCard title="Medical History" icon={BookOpen}>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {patient.details.medicalHistory.map((item, i) => (<li key={i}>{item}</li>))}
                    </ul>
                </InfoCard>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className={`p-6 rounded-xl shadow-lg border-2 ${getRiskClasses(patient.aiPrediction.risk).bg} ${getRiskClasses(patient.aiPrediction.risk).border}`}>
                    <div className="flex items-start gap-4">
                        <BrainCircuit className={`w-8 h-8 flex-shrink-0 mt-1 ${getRiskClasses(patient.aiPrediction.risk).text}`} />
                        <div>
                            <h3 className={`text-xl font-bold ${getRiskClasses(patient.aiPrediction.risk).text}`}>AI-Powered Health Assessment</h3>
                            <p className="text-gray-700 mt-2">{patient.aiPrediction.detailedAnalysis}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Contributing Factors:</h4>
                        <ul className="space-y-1.5">
                            {patient.aiPrediction.keyFactors.map((factor, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                    {factor}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ActionableCard title="Current Medications" icon={Pill} items={medications} setItems={setMedications} placeholder="Add medication..." />
                   <ActionableCard title="Doctor's Recommendations" icon={ListChecks} items={recommendations} setItems={setRecommendations} placeholder="Add recommendation..." />
                </div>
                
                <InfoCard title="Doctor's Notes" icon={FileText}>
                    <textarea 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)}
                        rows="4"
                        className="w-full p-3 text-sm bg-gray-50 border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Enter patient notes here..."
                    ></textarea>
                </InfoCard>
            </div>
        </div>
    </div>
  );

  const renderDashboard = () => (
    // ... No changes inside this function
    <>
      {activeTab === "patients" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(mockPatientData).map((p) => {
            const pRiskClasses = getRiskClasses(p.aiPrediction.risk);
            return (
              <div key={p.id} onClick={() => setSelectedPatientId(p.id)} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/80 hover:shadow-lg hover:ring-2 hover:ring-indigo-500 cursor-pointer transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.age} years, {p.gender}</p>
                  </div>
                </div>
                <div className={`px-4 py-3 rounded-lg border text-center ${pRiskClasses.bg} ${pRiskClasses.border}`}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${pRiskClasses.text}`}>AI Risk Assessment</span>
                  <div className={`text-2xl font-bold mt-1 ${pRiskClasses.text}`}>{p.aiPrediction.risk}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {activeTab === "appointments" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-4 rounded-xl shadow-sm border">
            <Calendar value={selectedDate} onChange={setSelectedDate} className="w-full border-none" tileClassName={({ date }) => mockAppointments[formatDate(date)] ? "has-appointment" : null} />
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Appointments on {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            {appointmentsOnSelectedDate.length > 0 ? (
              <ul className="space-y-3">
                {appointmentsOnSelectedDate.map((pid) => {
                  const p = mockPatientData[pid];
                  return (<li key={pid} className="bg-white p-4 rounded-lg border flex justify-between items-center cursor-pointer hover:bg-gray-50/80 transition-colors" onClick={() => setSelectedPatientId(pid)}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">{p.name}</h4>
                            <p className="text-sm text-gray-500">{p.age} yrs, {p.gender}</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskClasses(p.aiPrediction.risk).bg} ${getRiskClasses(p.aiPrediction.risk).text}`}>{p.aiPrediction.risk} Risk</div>
                  </li>);
                })}
              </ul>
            ) : (<div className="text-center py-16 bg-white border rounded-xl">
                    <CalendarDays className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="text-gray-500 mt-4">No appointments scheduled for this day.</p>
                </div>)
            }
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50/90 font-sans text-gray-900">
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200/80">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {selectedPatientId && (<button onClick={() => setSelectedPatientId(null)} className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"><ArrowLeft className="w-5 h-5" /> Back</button>)}
            <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">SmartEHR</h1>
            </div>
          </div>

          {/* --- UPDATED: Profile Section --- */}
          <div ref={profileCardRef} className="relative">
    <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
      
      {/* --- UPDATED IMAGE TAG --- */}
      <img src={doctorAvatar} alt="Doctor" className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-indigo-500 object-cover" />

      <div className="hidden md:block text-right">
        <div className="text-sm font-semibold text-gray-800">{doctorProfile ? doctorProfile.name : 'Loading...'}</div>
        <div className="text-xs text-gray-500">Doctor</div>
      </div>
    </div>

            {/* --- NEW: Profile Card --- */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border z-50 animate-fade-in-down overflow-hidden">
                <div className="p-4 border-b">
                    <p className="text-sm font-bold text-gray-800">{doctorProfile ? doctorProfile.name : 'Loading...'}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{doctorProfile ? doctorProfile.email : '...'}</span>
                    </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {!selectedPatientId && (
          <nav className="max-w-screen-2xl mx-auto px-6 flex border-t border-gray-200/80">
            <TabButton icon={Users} label="Today's Patients" isActive={activeTab === 'patients'} onClick={() => setActiveTab('patients')} />
            <TabButton icon={CalendarDays} label="Appointments" isActive={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')} />
          </nav>
        )}
      </header>
      <main className="max-w-screen-2xl mx-auto px-6 py-8">
        {selectedPatientId ? renderPatientDetail() : renderDashboard()}
      </main>
    </div>
  );
}

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button 
        className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-colors ${isActive ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`} 
        onClick={onClick}
    >
        <Icon className="w-5 h-5" />
        {label}
    </button>
);