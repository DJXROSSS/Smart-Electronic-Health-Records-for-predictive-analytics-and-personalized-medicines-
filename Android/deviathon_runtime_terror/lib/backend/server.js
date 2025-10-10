//////const express = require("express");
//////const mongoose = require("mongoose");
//////const bodyParser = require("body-parser");
//////const cors = require("cors");
//////require("dotenv").config();
//////
////////const authRoutes = require("./routes/auth");
//////const authRoutes = require("./routes/auth");
//////const profileRoutes = require("./routes/profile");
//////const app = express();
//////app.use("/api/user", authRoutes);
//////app.use("/api/profile", profileRoutes);
//////
//////app.use(cors());
//////app.use(bodyParser.json());
//////mongoose.connect(process.env.MONGO_URI)
//////  .then(() => console.log("MongoDB connected"))
//////  .catch(err => console.error(err));
//////
//////app.use("/api/user", authRoutes);
//////
//////const PORT = process.env.PORT || 5000;
//////app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
////////app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
////
////// server.js
////const express = require("express");
////const mongoose = require("mongoose");
////const bodyParser = require("body-parser");
////const cors = require("cors");
////require("dotenv").config();
////
////const authRoutes = require("./routes/auth");
////const profileRoutes = require("./routes/profile");
////
////const app = express();
////
////// ✅ Middleware first
////app.use(cors());
////app.use(bodyParser.json());
////app.use(express.json());
////
////// ✅ Routes after middleware
////app.use("/api/user", authRoutes);
////app.use("/api/profile", profileRoutes);
////
////// ✅ MongoDB connection
////mongoose.connect(process.env.MONGO_URI)
////  .then(() => console.log("✅ MongoDB connected"))
////  .catch(err => console.error("❌ MongoDB connection error:", err));
////
////// ✅ Start server
////const PORT = process.env.PORT || 5000;
////app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
//
//const express = require("express");
//const cors = require("cors");
//const dotenv = require("dotenv");
//const mongoose = require("mongoose");
//
//dotenv.config();
//
//const app = express();
//app.use(cors());
//app.use(express.json()); // <-- IMPORTANT
//app.use(express.urlencoded({ extended: true }));
//
//// Import routes
//const authRoutes = require("./routes/auth");
//const profileRoutes = require("./routes/profile");
//
//app.use("/api/user", authRoutes);
//app.use("/api/profile", profileRoutes);
//
//mongoose.connect(process.env.MONGO_URI)
//  .then(() => console.log("✅ MongoDB connected"))
//  .catch(err => console.log("❌ MongoDB connection error:", err));
//
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/user", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
