import React, { useState, useEffect } from "react";
import axios from 'axios';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  Heart,
  Droplet,
  AlertCircle,
  CheckCircle2,
  User,
  FileText,
  Brain,
  BarChart3,
  Stethoscope,
  Thermometer,
  Weight,
  Ruler,
  Pill,
  BookOpen,
  ListChecks,
} from "lucide-react";

// Using a placeholder image URL to resolve the local asset error
const doctorImage = "https://placehold.co/128x128/EBF4FF/3B82F6?text=Dr";

// --- Mock Data (to be replaced with API calls later) ---
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
      notes: "Occasional fatigue and dizziness reported over the past month.",
      medicalHistory: ["Prediabetes (2023)","Family history of Type 2 Diabetes","Mild hypertension",],
      currentMedications: ["Metformin 500mg daily", "Lisinopril 10mg daily"],
      doctorsRecommendations: ["Increase physical activity to 150 minutes per week","Reduce carbohydrate intake",],
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
      notes: "Annual check-up. No current health concerns reported.",
      medicalHistory: ["No significant medical history"],
      currentMedications: ["Multivitamin daily"],
      doctorsRecommendations: ["Maintain balanced diet", "Annual check-ups recommended"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Patient demonstrates optimal health markers across all measured parameters. The AI model indicates minimal risk for metabolic or cardiovascular conditions.",
      keyFactors: ["Optimal Blood Pressure","Healthy Glucose Levels","Normal BMI","Active Lifestyle"],
    },
  },
};

const mockAppointments = {
  "2025-10-09": ["PID-001", "PID-002"],
  "2025-10-08": ["PID-002"],"2025-10-07": ["PID-001"],
};


// --- Helper Components ---
const InfoCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    <div className="text-gray-600 space-y-2">{children}</div>
  </div>
);

const VitalSign = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
    <div className="p-2 bg-blue-100 rounded-full">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);


export default function DoctorDashboard({ handleLogout }) {
  const navigate = useNavigate();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const patient = selectedPatientId ? mockPatientData[selectedPatientId] : null;
  const [notes, setNotes] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [medications, setMedications] = useState([]);

  // Fetch doctor's profile for header
  useEffect(() => {
    const fetchDoctorProfile = async () => {
       const token = localStorage.getItem('token');
       if (!token) {
           handleLogout();
           return;
       }
       try {
           const res = await axios.get('http://localhost:5000/api/profile', {
               headers: { 'x-auth-token': token }
           });
           setDoctorProfile(res.data);
       } catch (error) {
           console.error("Failed to fetch profile", error);
           if (error.response && error.response.status === 401) {
               handleLogout();
           }
       }
    };
    fetchDoctorProfile();
  }, [handleLogout]);

  // Update notes/meds when a patient is selected
  useEffect(() => {
    if (patient) {
      setNotes(patient.details.notes);
      setRecommendations(patient.details.doctorsRecommendations || []);
      setMedications(patient.details.currentMedications || []);
    }
  }, [patient]);
  
  const getRiskClasses = (risk) => {
    // ... (utility function remains the same)
    switch (risk) {
      case "High": return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
      case "Medium": return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
      default: return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
    }
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const appointmentsOnSelectedDate = mockAppointments[formatDate(selectedDate)] || [];

  const renderPatientDetail = () => (
    <div className="animate-fade-in">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white ring-4 ring-blue-200">
          <User className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-lg text-gray-500">{patient.age} years, {patient.gender} &middot; ID: {patient.id}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <InfoCard title="Vitals" icon={Activity}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <VitalSign label="Heart Rate" value={patient.details.heartRate} icon={Heart} />
              <VitalSign label="Blood Pressure" value={patient.details.bloodPressure} icon={Stethoscope} />
              <VitalSign label="Glucose" value={patient.details.glucose} icon={Droplet} />
              <VitalSign label="Temperature" value={patient.details.temperature} icon={Thermometer} />
              <VitalSign label="Weight" value={patient.details.weight} icon={Weight} />
              <VitalSign label="Height" value={patient.details.height} icon={Ruler} />
            </div>
          </InfoCard>
          <InfoCard title="Medical History" icon={BookOpen}>
            <ul className="list-disc list-inside space-y-1">
              {patient.details.medicalHistory.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
          </InfoCard>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl shadow-sm border-2 ${getRiskClasses(patient.aiPrediction.risk).bg} ${getRiskClasses(patient.aiPrediction.risk).border}`}>
            <div className="flex items-center gap-3 mb-4">
              <Brain className={`w-7 h-7 ${getRiskClasses(patient.aiPrediction.risk).text}`} />
              <h3 className={`text-xl font-bold ${getRiskClasses(patient.aiPrediction.risk).text}`}>AI-Powered Health Assessment</h3>
            </div>
            <p className="text-gray-700">{patient.aiPrediction.detailedAnalysis}</p>
          </div>
          <InfoCard title="Key Risk Factors" icon={BarChart3}>
            <ul className="space-y-2">
              {patient.aiPrediction.keyFactors.map((factor, i) => (<li key={i} className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />{factor}</li>))}
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {activeTab === "patients" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.values(mockPatientData).map((p) => {
            const pRiskClasses = getRiskClasses(p.aiPrediction.risk);
            return (
              <div key={p.id} onClick={() => setSelectedPatientId(p.id)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-blue-200">
                    <User className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.age} years, {p.gender}</p>
                  </div>
                </div>
                <div className={`px-4 py-3 rounded-xl border-2 text-center ${pRiskClasses.bg} ${pRiskClasses.border}`}>
                  <div className="flex items-center justify-center gap-2">
                    {p.aiPrediction.risk === "High" ? <AlertCircle className={`w-5 h-5 ${pRiskClasses.text}`} /> : <CheckCircle2 className={`w-5 h-5 ${pRiskClasses.text}`} />}
                    <span className={`text-sm font-semibold ${pRiskClasses.text}`}>AI Risk Assessment</span>
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${pRiskClasses.text}`}>{p.aiPrediction.risk}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {activeTab === "appointments" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-4 rounded-2xl shadow-sm border">
            <Calendar value={selectedDate} onChange={setSelectedDate} className="w-full border-none" tileClassName={({ date }) => mockAppointments[formatDate(date)] ? "has-appointment" : null} />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Appointments on {selectedDate.toLocaleDateString()}</h3>
            {appointmentsOnSelectedDate.length > 0 ? (
              <ul className="space-y-4">
                {appointmentsOnSelectedDate.map((pid) => {
                  const p = mockPatientData[pid];
                  return (<li key={pid} className="bg-white p-4 rounded-xl border flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setSelectedPatientId(pid)}>
                    <div><h4 className="font-bold">{p.name}</h4><p className="text-sm text-gray-500">{p.age} yrs, {p.gender}</p></div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskClasses(p.aiPrediction.risk).bg} ${getRiskClasses(p.aiPrediction.risk).text}`}>{p.aiPrediction.risk} Risk</div>
                  </li>);
                })}
              </ul>
            ) : (<p className="text-gray-500 mt-8 text-center">No appointments for this day.</p>)}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {selectedPatientId && (<button onClick={() => setSelectedPatientId(null)} className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100"><ArrowLeft className="w-5 h-5" /> Back</button>)}
            <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Stethoscope className="w-5 h-5 text-white" /></div><h1 className="text-xl font-bold">SmartEHR</h1></div>
          </div>
          <div onClick={() => navigate('/profile')} className="flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
            <img src={doctorImage} alt="Doctor" className="w-11 h-11 rounded-full ring-2 ring-offset-2 ring-blue-500" />
            <div className="hidden md:block text-right">
              <div className="text-sm font-semibold">{doctorProfile ? doctorProfile.name : 'Loading...'}</div>
              <div className="text-xs text-gray-500">Doctor</div>
            </div>
          </div>
        </div>
        {!selectedPatientId && (
          <nav className="max-w-screen-xl mx-auto px-6 flex gap-2 border-t">
            <button className={`px-4 py-3 font-semibold text-sm ${activeTab === 'patients' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setActiveTab('patients')}>Today's Patients</button>
            <button className={`px-4 py-3 font-semibold text-sm ${activeTab === 'appointments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`} onClick={() => setActiveTab('appointments')}>Previous Appointments</button>
          </nav>
        )}
      </header>
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {selectedPatientId ? renderPatientDetail() : renderDashboard()}
      </main>
    </div>
  );
}

