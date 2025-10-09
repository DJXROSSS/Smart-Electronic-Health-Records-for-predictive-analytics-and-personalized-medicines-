import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  ArrowLeft, Activity, Heart, Droplet, AlertCircle, CheckCircle2, User, FileText,
  Brain, BarChart3, Stethoscope, Thermometer, Weight, Ruler, Pill, BookOpen, ListChecks
} from "lucide-react";
import doctorImage from "./assets/doctor-avatar.png";

// --- Mock Data ---
const mockPatientData = {
  "PID-001": {
    id: "PID-001",
    name: "Ayush Sharma",
    age: 45,
    gender: "Male",
    time: "10:00 AM",
    details: {
      bloodPressure: "130/85 mmHg",
      glucose: "150 mg/dL",
      heartRate: "78 bpm",
      temperature: "98.4°F",
      weight: "82 kg",
      height: "175 cm",
      notes: "Occasional fatigue and dizziness reported over the past month.",
      medicalHistory: ["Prediabetes (2023)", "Family history of Type 2 Diabetes", "Mild hypertension"],
      currentMedications: ["Metformin 500mg daily", "Lisinopril 10mg daily"],
      doctorsRecommendations: [
        "Increase physical activity to 150 minutes per week",
        "Reduce carbohydrate intake and focus on low glycemic index foods",
        "Schedule follow-up in 3 months for HbA1c test",
      ],
    },
    aiPrediction: {
      risk: "High",
      riskScore: 82,
      prediction: "High risk of developing Type 2 Diabetes within 5 years.",
      detailedAnalysis: "Based on current glucose levels, blood pressure readings, age, and family history, the AI model predicts an 82% likelihood of Type 2 Diabetes development within the next 5 years. The patient shows early warning signs including elevated fasting glucose, mild hypertension, and symptoms of fatigue which are commonly associated with insulin resistance.",
      keyFactors: ["Elevated Fasting Glucose (150 mg/dL)", "Age Factor (45 years)", "Hypertension (130/85)", "Family History of Diabetes", "BMI in Overweight Range"],
    },
  },
  "PID-002": {
    id: "PID-002",
    name: "Riya Gupta",
    age: 32,
    gender: "Female",
    time: "10:30 AM",
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
      doctorsRecommendations: [
        "Take these medication:-\n Lisinopril(3 times a day)",
        "Maintain balanced diet",
        "Annual check-ups recommended",
      ],
    },
    aiPrediction: {
      risk: "Low",
      riskScore: 15,
      prediction: "Low risk profile with excellent health indicators.",
      detailedAnalysis: "Patient demonstrates optimal health markers across all measured parameters. Blood pressure, glucose levels, and BMI are all within ideal ranges. The AI model indicates minimal risk for metabolic or cardiovascular conditions in the near future. Patient maintains an active lifestyle with good nutritional habits.",
      keyFactors: ["Optimal Blood Pressure", "Healthy Glucose Levels", "Normal BMI", "Active Lifestyle", "Young Age"],
    },
  },
};

const mockAppointments = {
  "2025-10-09": ["PID-001", "PID-002"],
  "2025-10-08": ["PID-002"],
  "2025-10-07": ["PID-001"],
  "2025-10-06": ["PID-001", "PID-002"],
  "2025-10-04": ["PID-002"],
  "2025-10-03": ["PID-001"]
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

// --- Main Component ---
export default function DoctorDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const patient = selectedPatientId ? mockPatientData[selectedPatientId] : null;

  const [notes, setNotes] = useState(patient?.details.notes || "");
  const [recommendations, setRecommendations] = useState(patient?.details.doctorsRecommendations || []);
  const [medications, setMedications] = useState(patient?.details.currentMedications || []);

  useEffect(() => {
    if (patient) {
      setNotes(patient.details.notes);
      setRecommendations(patient.details.doctorsRecommendations);
      setMedications(patient.details.currentMedications);
    }
  }, [patient]);

  const getRiskClasses = (risk) => {
    switch (risk) {
      case "High": return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", score: "text-red-500" };
      case "Medium": return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", score: "text-yellow-500" };
      default: return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", score: "text-green-600" };
    }
  };

  const riskClasses = patient ? getRiskClasses(patient.aiPrediction.risk) : {};
  const formatDate = (date) => date.toISOString().split("T")[0];
  const appointmentsOnSelectedDate = mockAppointments[formatDate(selectedDate)] || [];

  // --- Patient Detail View ---
  const renderPatientDetail = () => (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white ring-4 ring-blue-200 shadow-lg">
          <User className="w-12 h-12" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-lg text-gray-500">{patient.age} years, {patient.gender} &middot; ID: {patient.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
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
              {patient.details.medicalHistory.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </InfoCard>

          <InfoCard title="Doctor's Notes" icon={FileText}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded-md text-gray-700"
              rows={4}
            />
          </InfoCard>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Prediction */}
          <div className={`p-6 rounded-2xl shadow-sm border-2 ${riskClasses.bg} ${riskClasses.border}`}>
            <div className="flex items-center gap-3 mb-4">
              <Brain className={`w-7 h-7 ${riskClasses.text}`} />
              <h3 className={`text-xl font-bold ${riskClasses.text}`}>AI-Powered Health Assessment</h3>
            </div>
            <p className="text-gray-600">{patient.aiPrediction.detailedAnalysis}</p>
          </div>

          {/* Key Risk Factors */}
          <InfoCard title="Key Risk Factors" icon={BarChart3}>
            <ul className="space-y-2">
              {patient.aiPrediction.keyFactors.map((factor, i) => (
                <li key={i} className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" /> {factor}
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Doctor's Recommendations */}
          <InfoCard title="Doctor's Recommendations" icon={ListChecks}>
            {recommendations.map((item, i) => (
              <input
                key={i}
                type="text"
                value={item}
                onChange={(e) => {
                  const newRec = [...recommendations];
                  newRec[i] = e.target.value;
                  setRecommendations(newRec);
                }}
                className="w-full p-2 border rounded-md mb-2 text-gray-700"
              />
            ))}
            <button
              onClick={() => setRecommendations([...recommendations, ""])}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              + Add Recommendation
            </button>
          </InfoCard>

          {/* Current Medications */}
          <InfoCard title="Current Medications" icon={Pill}>
            {medications.map((item, i) => (
              <input
                key={i}
                type="text"
                value={item}
                onChange={(e) => {
                  const newMed = [...medications];
                  newMed[i] = e.target.value;
                  setMedications(newMed);
                }}
                className="w-full p-2 border rounded-md mb-2 text-gray-700"
              />
            ))}
            <button
              onClick={() => setMedications([...medications, ""])}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              + Add Medication
            </button>
          </InfoCard>
        </div>
      </div>
    </div>
  );

  // --- Dashboard ---
  const renderDashboard = () => (
    <>
      {activeTab === "patients" && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Patients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.values(mockPatientData).map((p) => {
              const pRiskClasses = getRiskClasses(p.aiPrediction.risk);
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white ring-2 ring-blue-200 group-hover:ring-blue-500 transition-all">
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
        </>
      )}

      {activeTab === "appointments" && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">Previous Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
               <Calendar
                 value={selectedDate}
                 onChange={setSelectedDate}
                 className="w-full border-none"
                 tileClassName={({ date }) => {
                   const dateStr = formatDate(date);
                   if (mockAppointments[dateStr]) return "has-appointment";
                   return null;
                 }}
               />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Appointments on {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
              {appointmentsOnSelectedDate.length > 0 ? (
                <ul className="space-y-4">
                  {appointmentsOnSelectedDate.map((pid) => {
                    const p = mockPatientData[pid];
                    const pRiskClasses = getRiskClasses(p.aiPrediction.risk);
                    return (
                      <li key={pid} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setSelectedPatientId(pid)}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><User className="w-5 h-5 text-blue-600" /></div>
                          <div>
                            <h4 className="font-bold text-gray-800">{p.name}</h4>
                            <p className="text-sm text-gray-500">{p.age} yrs, {p.gender}</p>
                          </div>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-sm font-semibold ${pRiskClasses.bg} ${pRiskClasses.text}`}>
                          {p.aiPrediction.risk} Risk
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                    <p className="mt-4 text-gray-500">No appointments scheduled for this day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="w-full bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {selectedPatientId && (
              <button
                onClick={() => setSelectedPatientId(null)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white"/>
                </div>
                <h1 className="text-xl font-bold text-gray-800">SmartEHR</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="text-sm font-semibold text-gray-800">Dr. Emily Carter</div>
              <div className="text-xs text-gray-500">Cardiologist</div>
            </div>
            <img
              src={doctorImage}
              alt="Doctor"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-offset-2 ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        {!selectedPatientId && (
          <nav className="max-w-screen-xl mx-auto px-6 flex gap-2 border-t border-gray-200">
            <button
              className={`px-4 py-3 font-semibold text-sm transition-colors ${activeTab === "patients" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setActiveTab("patients")}
            >
              Today's Patients
            </button>
            <button
              className={`px-4 py-3 font-semibold text-sm transition-colors ${activeTab === "appointments" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              onClick={() => setActiveTab("appointments")}
            >
              Previous Appointments
            </button>
          </nav>
        )}
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {selectedPatientId ? renderPatientDetail() : renderDashboard()}
      </main>
    </div>
  );
}
