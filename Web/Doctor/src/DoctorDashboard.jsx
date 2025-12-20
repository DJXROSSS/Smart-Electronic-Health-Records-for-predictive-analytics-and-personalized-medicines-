import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  Heart,
  Droplet,
  AlertTriangle,
  CheckCircle2,
  User,
  FileText,
  BrainCircuit,
  Stethoscope,
  Thermometer,
  Weight,
  Ruler,
  Pill,
  BookOpen,
  ListChecks,
  CalendarDays,
  Users,
  LogOut,
  Mail,
  Settings,
  UserCircle,
} from "lucide-react";
import doctorAvatar from "./assets/doctor-avatar.png";

// --- Mock Data (EXPANDED) ---
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
      notes:
        "Occasional fatigue and dizziness reported over the past month. Patient seems receptive to lifestyle changes but may need consistent follow-ups to ensure adherence.",
      medicalHistory: [
        "Prediabetes (2023)",
        "Family history of Type 2 Diabetes",
        "Mild hypertension",
      ],
      currentMedications: ["Metformin 500mg daily", "Lisinopril 10mg daily"],
      doctorsRecommendations: [
        "Increase physical activity to 150 minutes per week",
        "Reduce carbohydrate intake",
        "Monitor blood glucose levels twice weekly",
      ],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis:
        "Based on current glucose levels, blood pressure readings, age, and family history, the AI model predicts an 82% likelihood of Type 2 Diabetes development within the next 5 years.",
      keyFactors: [
        "Elevated Fasting Glucose (150 mg/dL)",
        "Age Factor (45 years)",
        "Hypertension (130/85)",
        "Family History of Diabetes",
      ],
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
      notes:
        "Annual check-up. No current health concerns reported. Patient is proactive about health and diet.",
      medicalHistory: ["No significant medical history"],
      currentMedications: ["Multivitamin daily"],
      doctorsRecommendations: [
        "Maintain balanced diet",
        "Continue annual check-ups",
      ],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis:
        "Patient demonstrates optimal health markers across all measured parameters. The AI model indicates minimal risk for metabolic or cardiovascular conditions.",
      keyFactors: [
        "Optimal Blood Pressure",
        "Healthy Glucose Levels",
        "Normal BMI",
        "Active Lifestyle",
      ],
    },
  },
  "PID-003": {
    id: "PID-003",
    name: "Karan Singh",
    age: 58,
    gender: "Male",
    details: {
      bloodPressure: "145/90 mmHg",
      glucose: "110 mg/dL",
      heartRate: "85 bpm",
      temperature: "98.6°F",
      weight: "88 kg",
      height: "178 cm",
      notes:
        "Patient reports shortness of breath during mild exertion. Referred for a cardiology consult.",
      medicalHistory: ["Hypertension Stage 1", "Smoker (10 years)"],
      currentMedications: ["Amlodipine 5mg daily"],
      doctorsRecommendations: ["Smoking cessation program", "Low-sodium diet"],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis:
        "Significant cardiovascular risk due to hypertension, age, and smoking history. AI predicts a 75% chance of a cardiovascular event in the next 10 years without intervention.",
      keyFactors: [
        "High Blood Pressure (145/90 mmHg)",
        "Smoking History",
        "Age (58)",
      ],
    },
  },
  "PID-004": {
    id: "PID-004",
    name: "Priya Patel",
    age: 29,
    gender: "Female",
    details: {
      bloodPressure: "120/80 mmHg",
      glucose: "88 mg/dL",
      heartRate: "68 bpm",
      temperature: "98.5°F",
      weight: "58 kg",
      height: "160 cm",
      notes: "Follow-up for seasonal allergies. Otherwise healthy.",
      medicalHistory: ["Allergic rhinitis"],
      currentMedications: ["Loratadine as needed"],
      doctorsRecommendations: ["Continue with current allergy management."],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis:
        "Excellent health profile. No significant long-term health risks detected.",
      keyFactors: ["Healthy Vitals", "Normal BMI", "Non-smoker"],
    },
  },
  "PID-005": {
    id: "PID-005",
    name: "Rohan Mehra",
    age: 35,
    gender: "Male",
    details: {
      bloodPressure: "128/82 mmHg",
      glucose: "135 mg/dL",
      heartRate: "75 bpm",
      temperature: "98.7°F",
      weight: "95 kg",
      height: "180 cm",
      notes:
        "Patient has a sedentary job and reports low energy levels. BMI is in the overweight category.",
      medicalHistory: ["Prediabetes"],
      currentMedications: [],
      doctorsRecommendations: [
        "Incorporate 30 minutes of daily exercise",
        "Dietary consultation for weight management",
      ],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "Elevated glucose and high BMI indicate a moderate risk of developing Type 2 Diabetes and metabolic syndrome. Lifestyle changes are crucial.",
      keyFactors: [
        "Elevated Glucose (135 mg/dL)",
        "Overweight (BMI)",
        "Sedentary Lifestyle",
      ],
    },
  },
  "PID-006": {
    id: "PID-006",
    name: "Anjali Desai",
    age: 42,
    gender: "Female",
    details: {
      bloodPressure: "115/75 mmHg",
      glucose: "105 mg/dL",
      heartRate: "70 bpm",
      temperature: "98.4°F",
      weight: "65 kg",
      height: "168 cm",
      notes: "Regular check-up. Reports feeling well.",
      medicalHistory: ["None"],
      currentMedications: ["Iron supplement"],
      doctorsRecommendations: ["Maintain active lifestyle"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis:
        "Overall good health. Glucose is on the higher side of normal, worth monitoring in future check-ups.",
      keyFactors: ["Healthy Vitals", "Active Lifestyle"],
    },
  },
  "PID-007": {
    id: "PID-007",
    name: "Vikram Batra",
    age: 51,
    gender: "Male",
    details: {
      bloodPressure: "135/88 mmHg",
      glucose: "160 mg/dL",
      heartRate: "82 bpm",
      temperature: "98.2°F",
      weight: "92 kg",
      height: "177 cm",
      notes: "Patient is non-compliant with medication.",
      medicalHistory: ["Type 2 Diabetes", "Hypertension"],
      currentMedications: ["Metformin", "Ramipril"],
      doctorsRecommendations: [
        "Stress medication adherence",
        "Follow-up in 3 months",
      ],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis:
        "Poorly managed chronic conditions. High risk for complications.",
      keyFactors: ["High Glucose", "Hypertension", "Medication Non-compliance"],
    },
  },
  "PID-008": {
    id: "PID-008",
    name: "Sunita Reddy",
    age: 65,
    gender: "Female",
    details: {
      bloodPressure: "140/85 mmHg",
      glucose: "115 mg/dL",
      heartRate: "78 bpm",
      temperature: "98.5°F",
      weight: "70 kg",
      height: "162 cm",
      notes: "Routine check for osteoporosis.",
      medicalHistory: ["Osteoporosis", "Mild Hypertension"],
      currentMedications: ["Alendronate", "Calcium/Vit D"],
      doctorsRecommendations: ["Weight-bearing exercises"],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "Age and borderline hypertension are moderate risk factors for future cardiovascular issues.",
      keyFactors: ["Age (65)", "Borderline Hypertension"],
    },
  },
  "PID-009": {
    id: "PID-009",
    name: "Amit Kumar",
    age: 25,
    gender: "Male",
    details: {
      bloodPressure: "118/78 mmHg",
      glucose: "90 mg/dL",
      heartRate: "65 bpm",
      temperature: "98.6°F",
      weight: "75 kg",
      height: "185 cm",
      notes: "Sports physical. Excellent health.",
      medicalHistory: ["None"],
      currentMedications: [],
      doctorsRecommendations: ["Stay hydrated during activity"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Athlete in peak physical condition.",
      keyFactors: ["Excellent Vitals", "Active Lifestyle"],
    },
  },
  "PID-010": {
    id: "PID-010",
    name: "Neha Joshi",
    age: 38,
    gender: "Female",
    details: {
      bloodPressure: "122/80 mmHg",
      glucose: "98 mg/dL",
      heartRate: "72 bpm",
      temperature: "98.4°F",
      weight: "63 kg",
      height: "163 cm",
      notes: "Patient reports high stress from work.",
      medicalHistory: ["Anxiety"],
      currentMedications: ["Sertraline"],
      doctorsRecommendations: ["Consider mindfulness or therapy"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis:
        "Physical health is good, mental health management is key.",
      keyFactors: ["Managed Anxiety", "Healthy Vitals"],
    },
  },
  "PID-011": {
    id: "PID-011",
    name: "Rajesh Khanna",
    age: 72,
    gender: "Male",
    details: {
      bloodPressure: "150/92 mmHg",
      glucose: "125 mg/dL",
      heartRate: "88 bpm",
      temperature: "98.1°F",
      weight: "78 kg",
      height: "170 cm",
      notes: "Complains of joint pain.",
      medicalHistory: ["Osteoarthritis", "Hypertension Stage 2"],
      currentMedications: ["Hydrochlorothiazide", "Celecoxib"],
      doctorsRecommendations: ["Physical therapy referral"],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis:
        "Multiple comorbidities and advanced age present a high overall risk.",
      keyFactors: ["Age (72)", "Hypertension Stage 2", "Multiple Medications"],
    },
  },
  "PID-012": {
    id: "PID-012",
    name: "Pooja Verma",
    age: 31,
    gender: "Female",
    details: {
      bloodPressure: "105/65 mmHg",
      glucose: "85 mg/dL",
      heartRate: "68 bpm",
      temperature: "98.3°F",
      weight: "55 kg",
      height: "158 cm",
      notes: "Annual check-up, feels great.",
      medicalHistory: ["None"],
      currentMedications: [],
      doctorsRecommendations: ["Continue healthy habits"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Excellent health markers.",
      keyFactors: ["Optimal Blood Pressure", "Healthy Vitals"],
    },
  },
  "PID-013": {
    id: "PID-013",
    name: "Sanjay Dutt",
    age: 48,
    gender: "Male",
    details: {
      bloodPressure: "130/84 mmHg",
      glucose: "140 mg/dL",
      heartRate: "76 bpm",
      temperature: "98.5°F",
      weight: "102 kg",
      height: "182 cm",
      notes: "Wants to start a weight loss program.",
      medicalHistory: ["High Cholesterol"],
      currentMedications: ["Atorvastatin"],
      doctorsRecommendations: ["Low-fat diet", "Join a gym"],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "Obesity and prediabetes are significant risk factors that require immediate lifestyle modification.",
      keyFactors: ["Obesity (BMI)", "High Cholesterol", "Prediabetes"],
    },
  },
  "PID-014": {
    id: "PID-014",
    name: "Deepika Padukone",
    age: 36,
    gender: "Female",
    details: {
      bloodPressure: "112/72 mmHg",
      glucose: "92 mg/dL",
      heartRate: "70 bpm",
      temperature: "98.6°F",
      weight: "60 kg",
      height: "170 cm",
      notes: "Regular checkup.",
      medicalHistory: ["None"],
      currentMedications: ["Multivitamin"],
      doctorsRecommendations: ["Maintain current lifestyle"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Very low risk profile.",
      keyFactors: ["Healthy Lifestyle", "Normal Vitals"],
    },
  },
  "PID-015": {
    id: "PID-015",
    name: "Arjun Reddy",
    age: 40,
    gender: "Male",
    details: {
      bloodPressure: "125/85 mmHg",
      glucose: "108 mg/dL",
      heartRate: "74 bpm",
      temperature: "98.4°F",
      weight: "85 kg",
      height: "179 cm",
      notes: "Family history of heart disease.",
      medicalHistory: ["None"],
      currentMedications: [],
      doctorsRecommendations: ["Annual cardiac screening"],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "While vitals are borderline, strong family history increases long-term cardiovascular risk.",
      keyFactors: ["Family History", "Borderline Vitals"],
    },
  },
  "PID-016": {
    id: "PID-016",
    name: "Ishita Dutta",
    age: 28,
    gender: "Female",
    details: {
      bloodPressure: "120/78 mmHg",
      glucose: "95 mg/dL",
      heartRate: "75 bpm",
      temperature: "98.7°F",
      weight: "68 kg",
      height: "169 cm",
      notes: "Pre-conception counseling.",
      medicalHistory: ["PCOS"],
      currentMedications: ["Folic Acid"],
      doctorsRecommendations: ["Maintain healthy weight"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "PCOS is managed. Overall low risk.",
      keyFactors: ["Managed PCOS"],
    },
  },
  "PID-017": {
    id: "PID-017",
    name: "Suresh Raina",
    age: 34,
    gender: "Male",
    details: {
      bloodPressure: "110/70 mmHg",
      glucose: "88 mg/dL",
      heartRate: "60 bpm",
      temperature: "98.5°F",
      weight: "78 kg",
      height: "175 cm",
      notes: "Professional athlete.",
      medicalHistory: ["ACL reconstruction (2022)"],
      currentMedications: [],
      doctorsRecommendations: ["Continue training regimen"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Elite athlete health profile.",
      keyFactors: ["Low Resting Heart Rate", "Excellent Vitals"],
    },
  },
  "PID-018": {
    id: "PID-018",
    name: "Meena Kumari",
    age: 55,
    gender: "Female",
    details: {
      bloodPressure: "138/88 mmHg",
      glucose: "118 mg/dL",
      heartRate: "80 bpm",
      temperature: "98.3°F",
      weight: "75 kg",
      height: "159 cm",
      notes: "Post-menopausal checkup.",
      medicalHistory: ["Hypothyroidism", "Hypertension"],
      currentMedications: ["Levothyroxine", "Lisinopril"],
      doctorsRecommendations: ["Monitor BP at home"],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "Controlled chronic conditions, but age and weight are moderate risk factors.",
      keyFactors: ["Age (55)", "Hypertension", "Post-menopausal"],
    },
  },
  "PID-019": {
    id: "PID-019",
    name: "Farhan Akhtar",
    age: 47,
    gender: "Male",
    details: {
      bloodPressure: "121/79 mmHg",
      glucose: "102 mg/dL",
      heartRate: "68 bpm",
      temperature: "98.6°F",
      weight: "80 kg",
      height: "176 cm",
      notes: "Maintains a very active lifestyle.",
      medicalHistory: ["None"],
      currentMedications: [],
      doctorsRecommendations: ["Continue regular exercise"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Excellent health for his age due to active lifestyle.",
      keyFactors: ["Active Lifestyle", "Healthy Vitals"],
    },
  },
  "PID-020": {
    id: "PID-020",
    name: "Kiara Advani",
    age: 30,
    gender: "Female",
    details: {
      bloodPressure: "115/75 mmHg",
      glucose: "90 mg/dL",
      heartRate: "70 bpm",
      temperature: "98.5°F",
      weight: "59 kg",
      height: "165 cm",
      notes: "Annual physical.",
      medicalHistory: ["None"],
      currentMedications: [],
      doctorsRecommendations: ["Continue balanced diet"],
    },
    aiPrediction: {
      risk: "Low",
      detailedAnalysis: "Low risk profile.",
      keyFactors: ["Healthy BMI", "Normal Vitals"],
    },
  },
  "PID-021": {
    id: "PID-021",
    name: "Manoj Bajpayee",
    age: 53,
    gender: "Male",
    details: {
      bloodPressure: "142/90 mmHg",
      glucose: "130 mg/dL",
      heartRate: "84 bpm",
      temperature: "98.4°F",
      weight: "86 kg",
      height: "175 cm",
      notes: "Patient under high stress.",
      medicalHistory: ["Hypertension Stage 1", "GERD"],
      currentMedications: ["Telmisartan", "Pantoprazole"],
      doctorsRecommendations: ["Stress management techniques"],
    },
    aiPrediction: {
      risk: "High",
      detailedAnalysis:
        "Uncontrolled hypertension and prediabetes, exacerbated by stress, pose a high risk.",
      keyFactors: ["Hypertension", "High Glucose", "Stress"],
    },
  },
  "PID-022": {
    id: "PID-022",
    name: "Shefali Shah",
    age: 49,
    gender: "Female",
    details: {
      bloodPressure: "128/82 mmHg",
      glucose: "112 mg/dL",
      heartRate: "76 bpm",
      temperature: "98.7°F",
      weight: "72 kg",
      height: "164 cm",
      notes: "Perimenopausal symptoms.",
      medicalHistory: ["Migraines"],
      currentMedications: ["Sumatriptan as needed"],
      doctorsRecommendations: ["Discuss HRT options", "Regular exercise"],
    },
    aiPrediction: {
      risk: "Medium",
      detailedAnalysis:
        "Borderline vitals and perimenopausal status present a medium risk for future health issues if not managed.",
      keyFactors: ["Perimenopause", "Borderline Vitals"],
    },
  },
};
const mockAppointments = {
  "2025-12-20": ["PID-001", "PID-005", "PID-011", "PID-022"],
  "2025-12-21": ["PID-002", "PID-015", "PID-020"],
  "2025-12-22": ["PID-003", "PID-012", "PID-018", "PID-019"],
  "2025-12-23": ["PID-004", "PID-008"],
  "2025-12-24": ["PID-007", "PID-013", "PID-017"],
  "2025-12-19": ["PID-006", "PID-010"],
  "2025-12-18": ["PID-009", "PID-014", "PID-021"],
  "2025-12-17": ["PID-016"],
};

// --- HELPER COMPONENTS ---
const InfoCard = ({ title, icon: Icon, children, className = "" }) => (
  <div
    className={`bg-gradient-to-br from-white via-white to-indigo-50/30 backdrop-blur-xl rounded-3xl shadow-xl border border-indigo-100/60 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] ${className}`}
  >
    <div className="flex items-center gap-3 p-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-sky-50/50">
      <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-md font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
    </div>
    <div className="p-6 text-gray-700 space-y-3">{children}</div>
  </div>
);

const VitalSign = ({ label, value, icon: Icon }) => (
  <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-white via-sky-50/30 to-indigo-50/30 rounded-2xl border border-sky-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-sky-300">
    <div className="p-3 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
      <Icon className="w-6 h-6 text-white flex-shrink-0" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xl font-extrabold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  </div>
);

const ActionableCard = ({
  title,
  icon: Icon,
  items,
  setItems,
  placeholder,
}) => (
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
          if (e.key === "Enter" && e.currentTarget.value) {
            setItems([...items, e.currentTarget.value]);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  </InfoCard>
);

const PatientCard = ({ patient, onClick, isSeen, onMarkSeen }) => {
  const riskClasses = getRiskClasses(patient.aiPrediction.risk);

  const handleMarkSeen = (e) => {
    e.stopPropagation();
    onMarkSeen(patient.id);
  };

  return (
    <div onClick={onClick} className="group perspective-1000">
      <div
        className={`relative rounded-3xl p-7 shadow-xl border cursor-pointer transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2 ${
          isSeen
            ? "bg-gradient-to-br from-white via-white to-indigo-50/40 border-indigo-100/60 hover:border-indigo-200"
            : "bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-red-200/60 hover:border-red-300 animate-pulse"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-sky-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center ring-4 ring-indigo-100/50 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-md transition-all duration-300 ${
                    isSeen ? "bg-green-400" : "bg-red-500 animate-ping"
                  }`}
                ></div>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-md ${
                    isSeen ? "bg-green-400" : "bg-red-500"
                  }`}
                ></div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {patient.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold">
                  {patient.age} years · {patient.gender}
                </p>
              </div>
            </div>

            {/* Mark as Seen Button - Compact version in header */}
            <button
              onClick={handleMarkSeen}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0 ${
                isSeen
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105"
              }`}
              disabled={isSeen}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSeen ? "Seen" : "Mark"}</span>
            </button>
          </div>
          <div
            className={`px-5 py-4 rounded-2xl border-2 text-center ${riskClasses.bg} ${riskClasses.border} shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-widest ${riskClasses.text}`}
            >
              AI Risk Assessment
            </span>
            <div className={`text-3xl font-black mt-2 ${riskClasses.text}`}>
              {patient.aiPrediction.risk}
            </div>
          </div>
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
  const [seenPatients, setSeenPatients] = useState({});

  // --- DATA FETCHING & OTHER LOGIC ---
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login...");
        handleLogout();
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorProfile(res.data.doctor);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        console.error("Error details:", error.response?.data);
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized - redirecting to login...");
          handleLogout();
        }
      }
    };
    fetchDoctorProfile();
  }, [handleLogout]);

  // Fetch marked patients from database
  useEffect(() => {
    const fetchMarkedPatients = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/marked-patients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Convert array to object map
        const markedMap = {};
        res.data.markedPatients.forEach((mp) => {
          markedMap[mp.patientId] = true;
        });
        setSeenPatients(markedMap);
        console.log(
          "✅ Loaded marked patients:",
          res.data.markedPatients.length
        );
      } catch (error) {
        console.error("Failed to fetch marked patients:", error);
      }
    };
    fetchMarkedPatients();
  }, []);

  useEffect(() => {
    if (patient) {
      setNotes(patient.details.notes || "");
      setRecommendations(patient.details.doctorsRecommendations || []);
      setMedications(patient.details.currentMedications || []);
    }
  }, [patient]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileCardRef]);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const appointmentsOnSelectedDate =
    mockAppointments[formatDate(selectedDate)] || [];

  const renderPatientDetail = () => (
    <div className="animate-fade-in">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/80 p-6 mb-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white ring-4 ring-white/80 shadow-lg">
                <User className="w-14 h-14" />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 px-2.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md ${getRiskClasses(
                  patient.aiPrediction.risk
                ).bg.replace("50", "600")}`}
              >
                {patient.aiPrediction.risk} Risk
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900">
                {patient.name}
              </h2>
              <p className="text-xl text-gray-500">
                {patient.age} years, {patient.gender} &middot; ID: {patient.id}
              </p>
            </div>
          </div>

          {/* Mark as Seen Button */}
          <button
            onClick={() => handleMarkSeen(patient.id)}
            className={`px-6 py-3 rounded-xl font-bold text-base flex items-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 ${
              seenPatients[patient.id]
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-default"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105"
            }`}
            disabled={seenPatients[patient.id]}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {seenPatients[patient.id]
                ? "Consultation Completed"
                : "Mark as Seen"}
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
        <div className="lg:col-span-1 space-y-6">
          <InfoCard title="Vitals" icon={Activity}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <VitalSign
                label="Heart Rate"
                value={patient.details.heartRate}
                icon={Heart}
              />
              <VitalSign
                label="Glucose"
                value={patient.details.glucose}
                icon={Droplet}
              />
              <VitalSign
                label="Blood Pressure"
                value={patient.details.bloodPressure}
                icon={Stethoscope}
              />
              <VitalSign
                label="Temperature"
                value={patient.details.temperature}
                icon={Thermometer}
              />
              <VitalSign
                label="Weight"
                value={patient.details.weight}
                icon={Weight}
              />
              <VitalSign
                label="Height"
                value={patient.details.height}
                icon={Ruler}
              />
            </div>
          </InfoCard>
          <InfoCard title="Medical History" icon={BookOpen}>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              {patient.details.medicalHistory.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {(() => {
            const riskClasses = getRiskClasses(patient.aiPrediction.risk);
            return (
              <div
                className={`p-6 rounded-2xl shadow-lg border-2 ${riskClasses.bg} ${riskClasses.border}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${riskClasses.bg.replace(
                      "50",
                      "200"
                    )}`}
                  >
                    <BrainCircuit
                      className={`w-8 h-8 flex-shrink-0 ${riskClasses.text}`}
                    />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${riskClasses.text}`}>
                      AI-Powered Health Assessment
                    </h3>
                    <p className="text-gray-700 mt-2">
                      {patient.aiPrediction.detailedAnalysis}
                    </p>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t">
                  <h4 className="font-bold text-sm text-gray-800 mb-2">
                    Key Contributing Factors:
                  </h4>
                  <ul className="space-y-2">
                    {patient.aiPrediction.keyFactors.map((factor, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActionableCard
              title="Current Medications"
              icon={Pill}
              items={medications}
              setItems={setMedications}
              placeholder="Add medication..."
            />
            <ActionableCard
              title="Doctor's Recommendations"
              icon={ListChecks}
              items={recommendations}
              setItems={setRecommendations}
              placeholder="Add recommendation..."
            />
          </div>
          <InfoCard title="Doctor's Notes" icon={FileText}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full p-3 text-sm bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
              placeholder="Enter patient notes here..."
            ></textarea>
          </InfoCard>
        </div>
      </div>
    </div>
  );

  const handleMarkSeen = async (patientId) => {
    try {
      const token = localStorage.getItem("token");
      const patient = mockPatientData[patientId];

      console.log("Marking patient as seen:", patientId, patient.name);

      const res = await axios.post(
        "http://localhost:5000/api/auth/mark-patient",
        {
          patientId: patientId,
          patientName: patient.name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Patient marked in database:", res.data);

      // Update local state
      setSeenPatients((prev) => ({
        ...prev,
        [patientId]: true,
      }));
    } catch (error) {
      console.error("Failed to mark patient:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to mark patient as seen. Please try again.");
    }
  };

  const renderDashboard = () => (
    <>
      {activeTab === "patients" && (
        <>
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Welcome, Dr. {doctorProfile?.name || "Doctor"}!
            </h1>
            <p className="text-lg text-gray-600">
              Here's an overview of your patients today
            </p>
          </div>

          {/* View Past Appointments Button */}
          <div className="mb-6">
            <button
              onClick={() => setActiveTab("appointments")}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <CalendarDays className="w-5 h-5" />
              View Past Appointments
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Object.values(mockPatientData).map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onClick={() => setSelectedPatientId(p.id)}
                isSeen={seenPatients[p.id] || false}
                onMarkSeen={handleMarkSeen}
              />
            ))}
          </div>
        </>
      )}
      {activeTab === "appointments" && (
        <div className="space-y-8 animate-fade-in">
          {/* Header Section with Back Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">
                Appointment Calendar
              </h2>
              <p className="text-lg text-gray-600">Manage and view all your scheduled appointments</p>
            </div>
            <button
              onClick={() => setActiveTab("patients")}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[420px,1fr] gap-8">
            {/* Calendar Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-indigo-100 hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <CalendarDays className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Select Date</h3>
                    <p className="text-sm text-gray-600 font-semibold">Choose a day to view appointments</p>
                  </div>
                </div>
                <Calendar
                  value={selectedDate}
                  onChange={setSelectedDate}
                  className="w-full border-none"
                  tileClassName={({ date }) =>
                    mockAppointments[formatDate(date)] ? "has-appointment" : null
                  }
                />
                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="font-semibold">Dates with scheduled appointments</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appointments List Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl blur-xl opacity-10"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h3>
                    <p className="text-sm text-gray-600 font-semibold mt-1 ml-13">
                      {appointmentsOnSelectedDate.length} appointment{appointmentsOnSelectedDate.length !== 1 ? 's' : ''} scheduled
                    </p>
                  </div>
                </div>
                
                {appointmentsOnSelectedDate.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {appointmentsOnSelectedDate.map((pid, index) => {
                      const p = mockPatientData[pid];
                      const riskClasses = getRiskClasses(p.aiPrediction.risk);
                      return (
                        <div
                          key={pid}
                          className="group relative animate-slide-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <div
                            className="relative bg-gradient-to-r from-white via-white to-indigo-50/30 backdrop-blur-sm p-6 rounded-2xl border-2 border-indigo-100 flex justify-between items-center cursor-pointer hover:border-indigo-300 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
                            onClick={() => setSelectedPatientId(pid)}
                          >
                            <div className="flex items-center gap-5 pointer-events-none">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-purple-600 rounded-2xl blur opacity-50"></div>
                                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl ring-4 ring-white/50">
                                  <User className="w-8 h-8 text-white" />
                                </div>
                              </div>
                              <div>
                                <h4 className="text-lg font-black text-gray-900 mb-1">
                                  {p.name}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-gray-600 font-semibold">
                                  <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {p.age} years
                                  </span>
                                  <span>•</span>
                                  <span>{p.gender}</span>
                                  <span>•</span>
                                  <span className="text-indigo-600 font-bold">ID: {p.id}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 pointer-events-none">
                              <div
                                className={`px-5 py-2.5 rounded-xl text-sm font-black ${riskClasses.bg} ${riskClasses.text} border-2 ${riskClasses.border} shadow-lg backdrop-blur-sm`}
                              >
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  {p.aiPrediction.risk} Risk
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-indigo-600 rotate-180" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl border-2 border-dashed border-gray-300">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-30"></div>
                      <CalendarDays className="relative w-20 h-20 mx-auto text-gray-400 mb-4" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-700 mb-2">No Appointments</h4>
                    <p className="text-gray-500 text-base">
                      No appointments scheduled for this day.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <CustomCalendarStyles />
      <div className="min-h-screen font-sans bg-gray-50 text-gray-900 bg-gradient-to-br from-sky-50 via-gray-50 to-indigo-50">
        <header className="w-full relative overflow-visible bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 backdrop-blur-xl sticky top-0 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Gradient bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          
          <div className="relative max-w-screen-2xl mx-auto px-6 py-5 flex justify-between items-center">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-6">
              {selectedPatientId && (
                <button
                  onClick={() => setSelectedPatientId(null)}
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 hover:shadow-2xl hover:scale-105 active:scale-95 border border-white/10"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span>Back</span>
                </button>
              )}

              <div className="flex items-center gap-4">
                {/* Logo icon with glow effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-opacity"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/20 group-hover:ring-white/30 transition-all">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Brand text */}
                <div>
                  <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                    ᴹᴱᴰᴵCONNECT
                  </h1>
                  <p className="text-xs text-indigo-300 font-bold tracking-wider">Smart Health Records Platform</p>
                </div>
              </div>
            </div>

            {/* RIGHT PROFILE SECTION */}
            <div className="flex items-center gap-6">
              {/* Quick Stats Badge */}
              {!selectedPatientId && (
                <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-sm font-bold text-white">Online</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-300" />
                    <span className="text-sm font-bold text-white">{Object.keys(mockPatientData).length} Patients</span>
                  </div>
                </div>
              )}
              
              {/* Profile dropdown */}
              <div ref={profileCardRef} className="relative">
                <div
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="group flex items-center gap-4 cursor-pointer p-2 pr-5 rounded-full bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 backdrop-blur-sm transition-all duration-300 border border-white/10 hover:border-indigo-400/50 shadow-lg hover:shadow-indigo-500/30 hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={doctorAvatar}
                      alt="Doctor"
                      className="relative w-12 h-12 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-white/50 shadow-lg transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 shadow-lg"></div>
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-white group-hover:text-indigo-100 transition-colors">
                      Dr. {doctorProfile ? doctorProfile.name : "Loading..."}
                    </p>
                    <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      <span>Active Now</span>
                    </span>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Dropdown */}
                {isProfileOpen && (
                  <div 
                    className="absolute top-full right-0 mt-4 w-72 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-500/20 overflow-hidden animate-scale-up"
                    style={{ zIndex: 9999 }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 pointer-events-none"></div>
                    
                    <div className="relative p-5 border-b border-slate-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <img
                            src={doctorAvatar}
                            alt="Doctor"
                            className="w-14 h-14 rounded-full ring-2 ring-indigo-500/50 shadow-lg object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                        </div>
                        <div>
                          <p className="text-base font-bold text-white">
                            Dr. {doctorProfile ? doctorProfile.name : "Loading..."}
                          </p>
                          <p className="text-xs text-indigo-300 font-semibold">Medical Practitioner</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 rounded-lg px-3 py-2">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{doctorProfile ? doctorProfile.email : "..."}</span>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        to="/doctorprofile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-indigo-600/20 rounded-xl transition-all hover:translate-x-1 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-indigo-600/20 flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                          <UserCircle className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span>View Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-purple-600/20 rounded-xl transition-all hover:translate-x-1 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                          <Settings className="w-5 h-5 text-purple-400" />
                        </div>
                        <span>Settings</span>
                      </Link>

                      <hr className="border-slate-700 my-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/20 rounded-xl transition-all hover:translate-x-1 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                          <LogOut className="w-5 h-5 text-red-400" />
                        </div>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
    case "High":
      return {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-200",
      };
    case "Medium":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
      };
    default:
      return {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
      };
  }
};

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    className={`flex items-center gap-2.5 px-4 py-3 font-bold text-sm transition-all duration-300 ${
      isActive
        ? "border-b-2 border-white text-white"
        : "text-indigo-200 hover:text-white"
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const CustomCalendarStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-down {
      from { opacity: 0; transform: translateY(-10px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-in { animation: fade-in 0.6s ease-out; }
    .animate-fade-in-down { animation: fade-in-down 0.3s ease-out; }
    .animate-slide-in { animation: slide-in 0.5s ease-out forwards; opacity: 0; }
    
    /* Custom Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%); }
    
    .react-calendar { background: transparent !important; }
    .react-calendar__tile { color: #374151; transition: all 0.3s; }
    .react-calendar__tile:hover { background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%) !important; border-radius: 12px; transform: scale(1.05); }
    .react-calendar__tile--now { background: linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 100%) !important; border-radius: 12px; font-weight: bold; }
    .react-calendar__tile--active { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important; color: white !important; border-radius: 12px; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3); }
    .react-calendar__month-view__days__day--neighboringMonth { color: #9ca3af !important; }
    .react-calendar__navigation button { color: #1e293b !important; font-weight: bold; transition: all 0.3s; }
    .react-calendar__navigation button:hover { background: rgba(99, 102, 241, 0.1) !important; border-radius: 8px; }
    .has-appointment { position: relative; }
    .has-appointment::after { content: ''; display: block; position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 50%; box-shadow: 0 2px 8px rgba(79, 70, 229, 0.5); }
  `}</style>
);
