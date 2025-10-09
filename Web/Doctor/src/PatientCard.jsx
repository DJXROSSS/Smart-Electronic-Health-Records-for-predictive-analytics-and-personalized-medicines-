import React from 'react';

// A small component for displaying AI prediction factors with a nice badge style.
const FactorBadge = ({ factor }) => (
  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
    {factor}
  </span>
);

function PatientCard({ patientData, onSelect, isSelected }) {
  // Destructure all the data from the patient object
  const { id, name, age, time, details, aiPrediction } = patientData;

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-3 shadow-md transition-all duration-300 border-l-4 cursor-pointer ${isSelected ? 'border-indigo-500' : 'border-blue-500'}`}
      onClick={() => onSelect(id)}
    >
      {/* --- Always Visible Header --- */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        <span className="text-sm font-bold text-blue-600">{time}</span>
      </div>
      <div className="text-sm text-gray-600">
        <p className="my-1"><span className="font-medium">Age:</span> {age}</p>
        <p className="my-1"><span className="font-medium">Patient ID:</span> {id}</p>
      </div>

      {/* --- Expanded Detailed View (Conditionally Rendered) --- */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          <h5 className="text-md font-bold text-gray-700 mb-2">Patient Details</h5>
          <div className="grid grid-cols-2 gap-x-4 text-sm mb-4">
            <p><span className="font-semibold">Blood Pressure:</span> {details.bloodPressure}</p>
            <p><span className="font-semibold">Glucose Level:</span> {details.glucose}</p>
          </div>
          <p className="text-sm text-gray-600"><span className="font-semibold">Notes:</span> {details.notes}</p>
          
          <h5 className="text-md font-bold text-gray-700 mt-4 mb-2">AI Prediction</h5>
          <div className="bg-gray-50 rounded-lg p-3">
             <p className="text-sm font-semibold text-gray-800">
               Risk Level: <span className={`font-bold ${aiPrediction.risk === 'High' ? 'text-red-600' : 'text-green-600'}`}>{aiPrediction.risk}</span>
               <span className="text-gray-500 font-normal"> ({aiPrediction.riskScore}%)</span>
             </p>
            <p className="text-sm text-gray-600 my-1">{aiPrediction.prediction}</p>
            <div className="mt-2">
              <h6 className="text-xs font-semibold text-gray-500 mb-1">Key Factors:</h6>
              {aiPrediction.keyFactors.map(factor => <FactorBadge key={factor} factor={factor} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientCard;

