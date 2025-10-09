// models/doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;