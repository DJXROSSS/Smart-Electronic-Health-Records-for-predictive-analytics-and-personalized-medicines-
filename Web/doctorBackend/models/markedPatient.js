// models/markedPatient.js
import mongoose from "mongoose";

const markedPatientSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  markedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Create compound index to prevent duplicate entries
markedPatientSchema.index({ doctorId: 1, patientId: 1 }, { unique: true });

const MarkedPatient = mongoose.model("MarkedPatient", markedPatientSchema);

export default MarkedPatient;
