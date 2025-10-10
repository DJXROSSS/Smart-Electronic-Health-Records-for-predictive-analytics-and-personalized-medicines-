////const mongoose = require("mongoose");
////
////const userSchema = new mongoose.Schema({
////    name: { type: String, required: true },
////    email: { type: String, required: true, unique: true },
////    password: { type: String, required: true },
////    age: { type: Number },
////    gender: { type: String },
////    contact: { type: String }
////}, { timestamps: true });
////
////module.exports = mongoose.model("User", userSchema);
//
//const mongoose = require("mongoose");
//
//const userSchema = new mongoose.Schema(
//  {
//    name: { type: String, required: true },
//    email: { type: String, required: true, unique: true },
//    password: { type: String, required: true },
//    age: { type: Number },
//    gender: { type: String },
//    contact: { type: String },
//
//    // --- Additional fields for Edit Profile Page ---
//    allergies: { type: String, default: "" },
//    medications: { type: String, default: "" },
//    dob: { type: String, default: "" }, // You can also use Date type if desired
//    conditions: { type: String, default: "" }
//  },
//  { timestamps: true }
//);
//
//module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    contact: { type: String },
    allergies: { type: String, default: "" },
    medications: { type: String, default: "" },
    dob: { type: String, default: "" },
    conditions: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
