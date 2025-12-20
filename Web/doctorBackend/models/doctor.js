// models/doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  specialization: { type: String, default: '' },
  licenseNumber: { type: String, default: '' },
  experience: { type: String, default: '' },
  hospital: { type: String, default: '' }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;