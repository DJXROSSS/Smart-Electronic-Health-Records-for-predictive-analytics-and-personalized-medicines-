import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// --- Route Imports ---
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./models/doctor.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'https://smart-electronic-health-records-for.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());


// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// --- API Routes ---
app.use("/api/auth", authRoutes);       
app.use("/api", doctorRoutes);          


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

