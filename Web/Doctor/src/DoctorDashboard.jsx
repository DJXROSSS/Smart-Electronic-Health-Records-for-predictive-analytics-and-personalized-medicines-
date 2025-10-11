import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import {
  ArrowLeft, Activity, Heart, Droplet, AlertTriangle, CheckCircle2,
  User, FileText, BrainCircuit, BarChart3, Stethoscope, Thermometer,
  Weight, Ruler, Pill, BookOpen, ListChecks, CalendarDays, Users, LogOut, Mail,
  Settings, UserCircle // New Icons for Dropdown
} from "lucide-react";
import doctorAvatar from './assets/doctor-avatar.png'; // Make sure this path is correct

// --- Mock Data (EXPANDED) ---
const mockPatientData = {
  "PID-001": { id: "PID-001", name: "Ayush Sharma", age: 45, gender: "Male", details: { bloodPressure: "130/85 mmHg", glucose: "150 mg/dL", heartRate: "78 bpm", temperature: "98.4°F", weight: "82 kg", height: "175 cm", notes: "Occasional fatigue and dizziness reported over the past month. Patient seems receptive to lifestyle changes but may need consistent follow-ups to ensure adherence.", medicalHistory: ["Prediabetes (2023)","Family history of Type 2 Diabetes","Mild hypertension",], currentMedications: ["Metformin 500mg daily", "Lisinopril 10mg daily"], doctorsRecommendations: ["Increase physical activity to 150 minutes per week","Reduce carbohydrate intake", "Monitor blood glucose levels twice weekly"], }, aiPrediction: { risk: "High", detailedAnalysis: "Based on current glucose levels, blood pressure readings, age, and family history, the AI model predicts an 82% likelihood of Type 2 Diabetes development within the next 5 years.", keyFactors: ["Elevated Fasting Glucose (150 mg/dL)","Age Factor (45 years)","Hypertension (130/85)","Family History of Diabetes",], }, },
  "PID-002": { id: "PID-002", name: "Riya Gupta", age: 32, gender: "Female", details: { bloodPressure: "110/70 mmHg", glucose: "95 mg/dL", heartRate: "72 bpm", temperature: "98.2°F", weight: "62 kg", height: "165 cm", notes: "Annual check-up. No current health concerns reported. Patient is proactive about health and diet.", medicalHistory: ["No significant medical history"], currentMedications: ["Multivitamin daily"], doctorsRecommendations: ["Maintain balanced diet", "Continue annual check-ups"], }, aiPrediction: { risk: "Low", detailedAnalysis: "Patient demonstrates optimal health markers across all measured parameters. The AI model indicates minimal risk for metabolic or cardiovascular conditions.", keyFactors: ["Optimal Blood Pressure","Healthy Glucose Levels","Normal BMI","Active Lifestyle"], }, },
  "PID-003": { id: "PID-003", name: "Karan Singh", age: 58, gender: "Male", details: { bloodPressure: "145/90 mmHg", glucose: "110 mg/dL", heartRate: "85 bpm", temperature: "98.6°F", weight: "88 kg", height: "178 cm", notes: "Patient reports shortness of breath during mild exertion. Referred for a cardiology consult.", medicalHistory: ["Hypertension Stage 1", "Smoker (10 years)"], currentMedications: ["Amlodipine 5mg daily"], doctorsRecommendations: ["Smoking cessation program", "Low-sodium diet"], }, aiPrediction: { risk: "High", detailedAnalysis: "Significant cardiovascular risk due to hypertension, age, and smoking history. AI predicts a 75% chance of a cardiovascular event in the next 10 years without intervention.", keyFactors: ["High Blood Pressure (145/90 mmHg)", "Smoking History", "Age (58)"], }, },
  "PID-004": { id: "PID-004", name: "Priya Patel", age: 29, gender: "Female", details: { bloodPressure: "120/80 mmHg", glucose: "88 mg/dL", heartRate: "68 bpm", temperature: "98.5°F", weight: "58 kg", height: "160 cm", notes: "Follow-up for seasonal allergies. Otherwise healthy.", medicalHistory: ["Allergic rhinitis"], currentMedications: ["Loratadine as needed"], doctorsRecommendations: ["Continue with current allergy management."], }, aiPrediction: { risk: "Low", detailedAnalysis: "Excellent health profile. No significant long-term health risks detected.", keyFactors: ["Healthy Vitals", "Normal BMI", "Non-smoker"], }, },
  "PID-005": { id: "PID-005", name: "Rohan Mehra", age: 35, gender: "Male", details: { bloodPressure: "128/82 mmHg", glucose: "135 mg/dL", heartRate: "75 bpm", temperature: "98.7°F", weight: "95 kg", height: "180 cm", notes: "Patient has a sedentary job and reports low energy levels. BMI is in the overweight category.", medicalHistory: ["Prediabetes"], currentMedications: [], doctorsRecommendations: ["Incorporate 30 minutes of daily exercise", "Dietary consultation for weight management"], }, aiPrediction: { risk: "Medium", detailedAnalysis: "Elevated glucose and high BMI indicate a moderate risk of developing Type 2 Diabetes and metabolic syndrome. Lifestyle changes are crucial.", keyFactors: ["Elevated Glucose (135 mg/dL)", "Overweight (BMI)", "Sedentary Lifestyle"], }, },
  "PID-006": { id: "PID-006", name: "Anjali Desai", age: 42, gender: "Female", details: { bloodPressure: "115/75 mmHg", glucose: "105 mg/dL", heartRate: "70 bpm", temperature: "98.4°F", weight: "65 kg", height: "168 cm", notes: "Regular check-up. Reports feeling well.", medicalHistory: ["None"], currentMedications: ["Iron supplement"], doctorsRecommendations: ["Maintain active lifestyle"], }, aiPrediction: { risk: "Low", detailedAnalysis: "Overall good health. Glucose is on the higher side of normal, worth monitoring in future check-ups.", keyFactors: ["Healthy Vitals", "Active Lifestyle"], }, },
  "PID-007": { id: "PID-007", name: "Vikram Batra", age: 51, gender: "Male", details: { bloodPressure: "135/88 mmHg", glucose: "160 mg/dL", heartRate: "82 bpm", temperature: "98.2°F", weight: "92 kg", height: "177 cm", notes: "Patient is non-compliant with medication.", medicalHistory: ["Type 2 Diabetes", "Hypertension"], currentMedications: ["Metformin", "Ramipril"], doctorsRecommendations: ["Stress medication adherence", "Follow-up in 3 months"] }, aiPrediction: { risk: "High", detailedAnalysis: "Poorly managed chronic conditions. High risk for complications.", keyFactors: ["High Glucose", "Hypertension", "Medication Non-compliance"] }},
  "PID-008": { id: "PID-008", name: "Sunita Reddy", age: 65, gender: "Female", details: { bloodPressure: "140/85 mmHg", glucose: "115 mg/dL", heartRate: "78 bpm", temperature: "98.5°F", weight: "70 kg", height: "162 cm", notes: "Routine check for osteoporosis.", medicalHistory: ["Osteoporosis", "Mild Hypertension"], currentMedications: ["Alendronate", "Calcium/Vit D"], doctorsRecommendations: ["Weight-bearing exercises"] }, aiPrediction: { risk: "Medium", detailedAnalysis: "Age and borderline hypertension are moderate risk factors for future cardiovascular issues.", keyFactors: ["Age (65)", "Borderline Hypertension"] }},
  "PID-009": { id: "PID-009", name: "Amit Kumar", age: 25, gender: "Male", details: { bloodPressure: "118/78 mmHg", glucose: "90 mg/dL", heartRate: "65 bpm", temperature: "98.6°F", weight: "75 kg", height: "185 cm", notes: "Sports physical. Excellent health.", medicalHistory: ["None"], currentMedications: [], doctorsRecommendations: ["Stay hydrated during activity"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Athlete in peak physical condition.", keyFactors: ["Excellent Vitals", "Active Lifestyle"] }},
  "PID-010": { id: "PID-010", name: "Neha Joshi", age: 38, gender: "Female", details: { bloodPressure: "122/80 mmHg", glucose: "98 mg/dL", heartRate: "72 bpm", temperature: "98.4°F", weight: "63 kg", height: "163 cm", notes: "Patient reports high stress from work.", medicalHistory: ["Anxiety"], currentMedications: ["Sertraline"], doctorsRecommendations: ["Consider mindfulness or therapy"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Physical health is good, mental health management is key.", keyFactors: ["Managed Anxiety", "Healthy Vitals"] }},
  "PID-011": { id: "PID-011", name: "Rajesh Khanna", age: 72, gender: "Male", details: { bloodPressure: "150/92 mmHg", glucose: "125 mg/dL", heartRate: "88 bpm", temperature: "98.1°F", weight: "78 kg", height: "170 cm", notes: "Complains of joint pain.", medicalHistory: ["Osteoarthritis", "Hypertension Stage 2"], currentMedications: ["Hydrochlorothiazide", "Celecoxib"], doctorsRecommendations: ["Physical therapy referral"] }, aiPrediction: { risk: "High", detailedAnalysis: "Multiple comorbidities and advanced age present a high overall risk.", keyFactors: ["Age (72)", "Hypertension Stage 2", "Multiple Medications"] }},
  "PID-012": { id: "PID-012", name: "Pooja Verma", age: 31, gender: "Female", details: { bloodPressure: "105/65 mmHg", glucose: "85 mg/dL", heartRate: "68 bpm", temperature: "98.3°F", weight: "55 kg", height: "158 cm", notes: "Annual check-up, feels great.", medicalHistory: ["None"], currentMedications: [], doctorsRecommendations: ["Continue healthy habits"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Excellent health markers.", keyFactors: ["Optimal Blood Pressure", "Healthy Vitals"] }},
  "PID-013": { id: "PID-013", name: "Sanjay Dutt", age: 48, gender: "Male", details: { bloodPressure: "130/84 mmHg", glucose: "140 mg/dL", heartRate: "76 bpm", temperature: "98.5°F", weight: "102 kg", height: "182 cm", notes: "Wants to start a weight loss program.", medicalHistory: ["High Cholesterol"], currentMedications: ["Atorvastatin"], doctorsRecommendations: ["Low-fat diet", "Join a gym"] }, aiPrediction: { risk: "Medium", detailedAnalysis: "Obesity and prediabetes are significant risk factors that require immediate lifestyle modification.", keyFactors: ["Obesity (BMI)", "High Cholesterol", "Prediabetes"] }},
  "PID-014": { id: "PID-014", name: "Deepika Padukone", age: 36, gender: "Female", details: { bloodPressure: "112/72 mmHg", glucose: "92 mg/dL", heartRate: "70 bpm", temperature: "98.6°F", weight: "60 kg", height: "170 cm", notes: "Regular checkup.", medicalHistory: ["None"], currentMedications: ["Multivitamin"], doctorsRecommendations: ["Maintain current lifestyle"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Very low risk profile.", keyFactors: ["Healthy Lifestyle", "Normal Vitals"] }},
  "PID-015": { id: "PID-015", name: "Arjun Reddy", age: 40, gender: "Male", details: { bloodPressure: "125/85 mmHg", glucose: "108 mg/dL", heartRate: "74 bpm", temperature: "98.4°F", weight: "85 kg", height: "179 cm", notes: "Family history of heart disease.", medicalHistory: ["None"], currentMedications: [], doctorsRecommendations: ["Annual cardiac screening"] }, aiPrediction: { risk: "Medium", detailedAnalysis: "While vitals are borderline, strong family history increases long-term cardiovascular risk.", keyFactors: ["Family History", "Borderline Vitals"] }},
  "PID-016": { id: "PID-016", name: "Ishita Dutta", age: 28, gender: "Female", details: { bloodPressure: "120/78 mmHg", glucose: "95 mg/dL", heartRate: "75 bpm", temperature: "98.7°F", weight: "68 kg", height: "169 cm", notes: "Pre-conception counseling.", medicalHistory: ["PCOS"], currentMedications: ["Folic Acid"], doctorsRecommendations: ["Maintain healthy weight"] }, aiPrediction: { risk: "Low", detailedAnalysis: "PCOS is managed. Overall low risk.", keyFactors: ["Managed PCOS"] }},
  "PID-017": { id: "PID-017", name: "Suresh Raina", age: 34, gender: "Male", details: { bloodPressure: "110/70 mmHg", glucose: "88 mg/dL", heartRate: "60 bpm", temperature: "98.5°F", weight: "78 kg", height: "175 cm", notes: "Professional athlete.", medicalHistory: ["ACL reconstruction (2022)"], currentMedications: [], doctorsRecommendations: ["Continue training regimen"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Elite athlete health profile.", keyFactors: ["Low Resting Heart Rate", "Excellent Vitals"] }},
  "PID-018": { id: "PID-018", name: "Meena Kumari", age: 55, gender: "Female", details: { bloodPressure: "138/88 mmHg", glucose: "118 mg/dL", heartRate: "80 bpm", temperature: "98.3°F", weight: "75 kg", height: "159 cm", notes: "Post-menopausal checkup.", medicalHistory: ["Hypothyroidism", "Hypertension"], currentMedications: ["Levothyroxine", "Lisinopril"], doctorsRecommendations: ["Monitor BP at home"] }, aiPrediction: { risk: "Medium", detailedAnalysis: "Controlled chronic conditions, but age and weight are moderate risk factors.", keyFactors: ["Age (55)", "Hypertension", "Post-menopausal"] }},
  "PID-019": { id: "PID-019", name: "Farhan Akhtar", age: 47, gender: "Male", details: { bloodPressure: "121/79 mmHg", glucose: "102 mg/dL", heartRate: "68 bpm", temperature: "98.6°F", weight: "80 kg", height: "176 cm", notes: "Maintains a very active lifestyle.", medicalHistory: ["None"], currentMedications: [], doctorsRecommendations: ["Continue regular exercise"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Excellent health for his age due to active lifestyle.", keyFactors: ["Active Lifestyle", "Healthy Vitals"] }},
  "PID-020": { id: "PID-020", name: "Kiara Advani", age: 30, gender: "Female", details: { bloodPressure: "115/75 mmHg", glucose: "90 mg/dL", heartRate: "70 bpm", temperature: "98.5°F", weight: "59 kg", height: "165 cm", notes: "Annual physical.", medicalHistory: ["None"], currentMedications: [], doctorsRecommendations: ["Continue balanced diet"] }, aiPrediction: { risk: "Low", detailedAnalysis: "Low risk profile.", keyFactors: ["Healthy BMI", "Normal Vitals"] }},
  "PID-021": { id: "PID-021", name: "Manoj Bajpayee", age: 53, gender: "Male", details: { bloodPressure: "142/90 mmHg", glucose: "130 mg/dL", heartRate: "84 bpm", temperature: "98.4°F", weight: "86 kg", height: "175 cm", notes: "Patient under high stress.", medicalHistory: ["Hypertension Stage 1", "GERD"], currentMedications: ["Telmisartan", "Pantoprazole"], doctorsRecommendations: ["Stress management techniques"] }, aiPrediction: { risk: "High", detailedAnalysis: "Uncontrolled hypertension and prediabetes, exacerbated by stress, pose a high risk.", keyFactors: ["Hypertension", "High Glucose", "Stress"] }},
  "PID-022": { id: "PID-022", name: "Shefali Shah", age: 49, gender: "Female", details: { bloodPressure: "128/82 mmHg", glucose: "112 mg/dL", heartRate: "76 bpm", temperature: "98.7°F", weight: "72 kg", height: "164 cm", notes: "Perimenopausal symptoms.", medicalHistory: ["Migraines"], currentMedications: ["Sumatriptan as needed"], doctorsRecommendations: ["Discuss HRT options", "Regular exercise"] }, aiPrediction: { risk: "Medium", detailedAnalysis: "Borderline vitals and perimenopausal status present a medium risk for future health issues if not managed.", keyFactors: ["Perimenopause", "Borderline Vitals"] }},
};
const mockAppointments = {
  "2025-10-10": ["PID-001", "PID-005", "PID-011", "PID-022"],
  "2025-10-09": ["PID-002", "PID-015", "PID-020"],
  "2025-10-08": ["PID-003", "PID-012", "PID-018", "PID-019"],
  "2025-10-07": ["PID-004", "PID-008"],
  "2025-10-06": ["PID-007", "PID-013", "PID-017"],
  "2025-10-03": ["PID-006", "PID-010"],
  "2025-10-02": ["PID-009", "PID-014", "PID-021"],
  "2025-09-30": ["PID-016"],
};

// --- HELPER COMPONENTS ---
const InfoCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white/60 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/80 overflow-hidden ${className}`}>
    <div className="flex items-center gap-3 p-4 border-b bg-gray-50/50">
      <Icon className="w-5 h-5 text-indigo-500" />
      <h3 className="text-md font-bold text-gray-800">{title}</h3>
    </div>
    <div className="p-5 text-gray-700 space-y-3">{children}</div>
  </div>
);

const VitalSign = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/90 shadow-sm">
    <div className="p-2 bg-sky-100 rounded-lg">
        <Icon className="w-6 h-6 text-sky-600 flex-shrink-0" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-semibold">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionableCard = ({ title, icon: Icon, items, setItems, placeholder }) => (
    <InfoCard title={title} icon={Icon}>
        <ul className="space-y-2.5">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                </li>
            ))}
        </ul>
        <div className="mt-4">
            <input 
                type="text" 
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
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

const PatientCard = ({ patient, onClick }) => {
    const riskClasses = getRiskClasses(patient.aiPrediction.risk);
    return (
        <div onClick={onClick} className="group perspective-1000">
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80 cursor-pointer transition-all duration-500 transform-style-3d group-hover:transform-rotate-y-4 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center ring-4 ring-white/80 shadow-inner">
                        <User className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-xl border-2 text-center ${riskClasses.bg} ${riskClasses.border} shadow-inner`}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${riskClasses.text}`}>AI Risk Assessment</span>
                    <div className={`text-2xl font-extrabold mt-1 ${riskClasses.text}`}>{patient.aiPrediction.risk}</div>
                </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---
export default function DoctorDashboard({ handleLogout }) {
  const navigate = useNavigate();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileCardRef = useRef(null);
  const patient = selectedPatientId ? mockPatientData[selectedPatientId] : null;
  const [notes, setNotes] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [medications, setMedications] = useState([]);

  // --- DATA FETCHING & OTHER LOGIC ---
  useEffect(() => {
    const fetchDoctorProfile = async () => {
       const token = localStorage.getItem('token');
       if (!token) { handleLogout(); return; }
       try {
           const res = await axios.get('http://localhost:5000/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
           setDoctorProfile(res.data.doctor);
       } catch (error) {
           console.error("Failed to fetch profile", error);
           if (error.response && error.response.status === 401) { handleLogout(); }
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileCardRef.current && !profileCardRef.current.contains(event.target)) { setIsProfileOpen(false); }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [profileCardRef]);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const appointmentsOnSelectedDate = mockAppointments[formatDate(selectedDate)] || [];

  const renderPatientDetail = () => (
    <div className="animate-fade-in">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 p-6 mb-8">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white ring-4 ring-white/80 shadow-lg">
                        <User className="w-14 h-14" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md ${getRiskClasses(patient.aiPrediction.risk).bg.replace('50', '600')}`}>
                        {patient.aiPrediction.risk} Risk
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900">{patient.name}</h2>
                    <p className="text-xl text-gray-500">{patient.age} years, {patient.gender} &middot; ID: {patient.id}</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
            <div className="lg:col-span-1 space-y-6">
                <InfoCard title="Vitals" icon={Activity}><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <VitalSign label="Heart Rate" value={patient.details.heartRate} icon={Heart} />
                    <VitalSign label="Glucose" value={patient.details.glucose} icon={Droplet} />
                    <VitalSign label="Blood Pressure" value={patient.details.bloodPressure} icon={Stethoscope} />
                    <VitalSign label="Temperature" value={patient.details.temperature} icon={Thermometer} />
                    <VitalSign label="Weight" value={patient.details.weight} icon={Weight} />
                    <VitalSign label="Height" value={patient.details.height} icon={Ruler} />
                </div></InfoCard>
                <InfoCard title="Medical History" icon={BookOpen}><ul className="list-disc list-inside space-y-1.5 text-sm">
                    {patient.details.medicalHistory.map((item, i) => (<li key={i}>{item}</li>))}
                </ul></InfoCard>
            </div>
            <div className="lg:col-span-2 space-y-6">
                {(()=>{
                    const riskClasses = getRiskClasses(patient.aiPrediction.risk);
                    return (<div className={`p-6 rounded-2xl shadow-lg border-2 ${riskClasses.bg} ${riskClasses.border}`}>
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${riskClasses.bg.replace('50','200')}`}>
                              <BrainCircuit className={`w-8 h-8 flex-shrink-0 ${riskClasses.text}`} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${riskClasses.text}`}>AI-Powered Health Assessment</h3>
                                <p className="text-gray-700 mt-2">{patient.aiPrediction.detailedAnalysis}</p>
                            </div>
                        </div>
                        <div className="mt-5 pt-5 border-t">
                            <h4 className="font-bold text-sm text-gray-800 mb-2">Key Contributing Factors:</h4>
                            <ul className="space-y-2">
                                {patient.aiPrediction.keyFactors.map((factor, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />{factor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>)
                })()}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ActionableCard title="Current Medications" icon={Pill} items={medications} setItems={setMedications} placeholder="Add medication..." />
                   <ActionableCard title="Doctor's Recommendations" icon={ListChecks} items={recommendations} setItems={setRecommendations} placeholder="Add recommendation..." />
                </div>
                <InfoCard title="Doctor's Notes" icon={FileText}>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="4"
                        className="w-full p-3 text-sm bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                        placeholder="Enter patient notes here..."
                    ></textarea>
                </InfoCard>
            </div>
        </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {activeTab === "patients" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.values(mockPatientData).map((p) => (<PatientCard key={p.id} patient={p} onClick={() => setSelectedPatientId(p.id)} />))}
        </div>
      )}
      {activeTab === "appointments" && (
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-8">
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-lg border">
            <Calendar value={selectedDate} onChange={setSelectedDate} className="w-full border-none" tileClassName={({ date }) => mockAppointments[formatDate(date)] ? "has-appointment" : null} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Appointments on {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            {appointmentsOnSelectedDate.length > 0 ? (
              <ul className="space-y-4">
                {appointmentsOnSelectedDate.map((pid) => {
                  const p = mockPatientData[pid];
                  const riskClasses = getRiskClasses(p.aiPrediction.risk);
                  return (<li key={pid} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border flex justify-between items-center cursor-pointer hover:bg-white transition-all hover:shadow-lg hover:scale-[1.02]" onClick={() => setSelectedPatientId(pid)}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center">
                            <User className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">{p.name}</h4>
                            <p className="text-sm text-gray-500">{p.age} yrs, {p.gender}</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${riskClasses.bg} ${riskClasses.text} border ${riskClasses.border}`}>{p.aiPrediction.risk} Risk</div>
                  </li>);
                })}
              </ul>
            ) : (<div className="text-center py-20 bg-white/60 backdrop-blur-md border rounded-2xl shadow-lg">
                    <CalendarDays className="w-16 h-16 mx-auto text-gray-400" />
                    <p className="text-gray-500 mt-4 text-lg">No appointments scheduled for this day.</p>
                </div>)
            }
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <CustomCalendarStyles />
      <div className="min-h-screen font-sans bg-gray-50 text-gray-900 bg-gradient-to-br from-sky-50 via-gray-50 to-indigo-50">
        <header className="w-full bg-slate-900 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-slate-800">
          <div className="max-w-screen-2xl mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {selectedPatientId && (<button onClick={() => setSelectedPatientId(null)} className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 transition-colors shadow-sm"><ArrowLeft className="w-5 h-5" /> Back</button>)}
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-white">ᴹᴱᴰᴵCONNECT</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div ref={profileCardRef} className="relative">
                <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-4 cursor-pointer p-2 rounded-full hover:bg-slate-800/80 transition-colors">
                  <img src={doctorAvatar} alt="Doctor" className="w-11 h-11 rounded-full ring-4 ring-white/20 shadow-md object-cover" />
                  <div className="hidden md:block text-right">
                    <div className="text-sm font-bold text-white">{doctorProfile ? doctorProfile.name : 'Loading...'}</div>
                    <div className="text-xs text-indigo-200 font-semibold">Doctor</div>
                  </div>
                </div>

                {/* --- IMPROVED DROPDOWN --- */}
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-slate-800/90 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700 z-50 animate-fade-in-down origin-top-right transform transition-all duration-300">
                    <div className="p-4 border-b border-slate-700">
                        <p className="text-md font-bold text-white">{doctorProfile ? doctorProfile.name : 'Loading...'}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                            <Mail className="w-3.5 h-3.5" /><span>{doctorProfile ? doctorProfile.email : '...'}</span>
                        </div>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link to="/profile" className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 rounded-md transition-colors">
                        <UserCircle className="w-5 h-5" />
                        View Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 rounded-md transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                      </Link>
                      
                      <hr className="border-slate-700 my-1" />

                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!selectedPatientId && (
            <nav className="max-w-screen-2xl mx-auto px-6 flex border-t border-slate-700">
              <TabButton icon={Users} label="Today's Patients" isActive={activeTab === 'patients'} onClick={() => setActiveTab('patients')} />
              <TabButton icon={CalendarDays} label="Appointments" isActive={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')} />
            </nav>
          )}
        </header>
        <main className="max-w-screen-2xl mx-auto px-6 py-10">
          {selectedPatientId ? renderPatientDetail() : renderDashboard()}
        </main>
      </div>
    </>
  );
}

// --- UTILITY & STYLE FUNCTIONS ---
const getRiskClasses = (risk) => {
    switch (risk) {
      case "High": return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" };
      case "Medium": return { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" };
      default: return { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" };
    }
};

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button className={`flex items-center gap-2.5 px-4 py-3 font-bold text-sm transition-all duration-300 ${isActive ? 'border-b-2 border-white text-white' : 'text-indigo-200 hover:text-white'}`} onClick={onClick}>
        <Icon className="w-5 h-5" />{label}
    </button>
);

const CustomCalendarStyles = () => (
  <style>{`
    .react-calendar { background: transparent !important; }
    .react-calendar__tile { color: #374151; }
    .react-calendar__tile:hover { background: #e0e7ff !important; border-radius: 8px; }
    .react-calendar__tile--now { background: #c7d2fe !important; border-radius: 8px; }
    .react-calendar__tile--active { background: #4f46e5 !important; color: white !important; border-radius: 8px; }
    .react-calendar__month-view__days__day--neighboringMonth { color: #9ca3af !important; }
    .react-calendar__navigation button { color: #1e293b !important; font-weight: bold; }
    .has-appointment { position: relative; }
    .has-appointment::after { content: ''; display: block; position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background-color: #4f46e5; border-radius: 50%; }
  `}</style>
);