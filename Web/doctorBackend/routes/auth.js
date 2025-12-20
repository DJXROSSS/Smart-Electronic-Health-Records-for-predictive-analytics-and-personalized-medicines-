import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.js"; 
import MarkedPatient from "../models/markedPatient.js";

const router = express.Router();

// --- JWT Auth Middleware ---
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect: Bearer <token>
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.doctorId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// --- Register ---
router.post("/register", async (req, res) => {
  console.log("Register route hit!", req.body);
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "Please fill out all fields." });
    }

    const existingDoctor = await Doctor.findOne({ $or: [{ email }, { username }] });
    if (existingDoctor) {
      return res.status(400).json({ message: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newDoctor = new Doctor({ username, name, email, password: hashedPassword });
    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully. Please login." });
  } catch (err) {
    console.error("REGISTRATION ERROR:", err);
    res.status(500).json({ message: "Server error during registration. Please check server logs." });
  }
});

// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password." });
    }

    const doctor = await Doctor.findOne({ username });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      token, 
      doctor: { 
        id: doctor._id, 
        name: doctor.name, 
        email: doctor.email,
        specialization: doctor.specialization || "" // optional if you have this field
      } 
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

// --- Get current logged-in doctor profile ---
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctorId).select("-password"); // exclude password
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({ doctor });
  } catch (err) {
    console.error("PROFILE FETCH ERROR:", err);
    res.status(500).json({ message: "Server error fetching doctor profile" });
  }
});

// --- Update doctor profile ---
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { phone, specialization, experience, hospital } = req.body;
    console.log('📝 Update request received for doctor ID:', req.doctorId);
    console.log('📦 Request body:', req.body);
    
    const updateData = {};
    if (phone !== undefined) updateData.phone = phone;
    if (specialization !== undefined) updateData.specialization = specialization;
    if (experience !== undefined) updateData.experience = experience;
    if (hospital !== undefined) updateData.hospital = hospital;

    console.log('✏️ Update data to be saved:', updateData);

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.doctorId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedDoctor) {
      console.error('❌ Doctor not found with ID:', req.doctorId);
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log('✅ Profile updated successfully:', updatedDoctor);
    res.json({ 
      message: "Profile updated successfully",
      doctor: updatedDoctor 
    });
  } catch (err) {
    console.error("❌ PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

// --- Mark patient as seen ---
router.post("/mark-patient", authMiddleware, async (req, res) => {
  try {
    const { patientId, patientName } = req.body;
    console.log('👁️ Mark patient request for doctor ID:', req.doctorId);
    console.log('📋 Patient info:', { patientId, patientName });

    if (!patientId || !patientName) {
      return res.status(400).json({ message: "Patient ID and name are required" });
    }

    // Check if already marked
    const existingMark = await MarkedPatient.findOne({
      doctorId: req.doctorId,
      patientId: patientId
    });

    if (existingMark) {
      return res.json({
        message: "Patient already marked as seen",
        markedPatient: existingMark
      });
    }

    // Create new marked patient record
    const markedPatient = new MarkedPatient({
      doctorId: req.doctorId,
      patientId: patientId,
      patientName: patientName
    });

    await markedPatient.save();
    console.log('✅ Patient marked as seen:', markedPatient);

    res.status(201).json({
      message: "Patient marked as seen successfully",
      markedPatient: markedPatient
    });
  } catch (err) {
    console.error("❌ MARK PATIENT ERROR:", err);
    res.status(500).json({ message: "Server error marking patient" });
  }
});

// --- Get all marked patients for a doctor ---
router.get("/marked-patients", authMiddleware, async (req, res) => {
  try {
    console.log('📋 Fetching marked patients for doctor ID:', req.doctorId);
    
    const markedPatients = await MarkedPatient.find({ doctorId: req.doctorId })
      .sort({ markedAt: -1 });

    console.log('✅ Found marked patients:', markedPatients.length);
    
    res.json({
      markedPatients: markedPatients
    });
  } catch (err) {
    console.error("❌ FETCH MARKED PATIENTS ERROR:", err);
    res.status(500).json({ message: "Server error fetching marked patients" });
  }
});

export default router;
