const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// ... (Your existing SIGNUP and LOGIN routes go here) ...
router.post("/signup", async (req, res) => { /* ... */ });
router.post("/login", async (req, res) => { /* ... */ });


// FETCH PROFILE ROUTE
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ ADD THIS ROUTE TO UPDATE THE PROFILE
router.put("/profile/update", async (req, res) => {
    try {
        const { email, ...updateData } = req.body; // Separate email from the rest of the data

        if (!email) {
            return res.status(400).json({ error: "Email is required to identify the user." });
        }

        // Find the user by email and update their data
        const updatedUser = await User.findOneAndUpdate(
            { email: email }, // Find document with this email
            { $set: updateData }, // Apply the updates
            { new: true, runValidators: true } // Options: return the new doc, run schema validators
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json({ message: "Profile updated successfully!", user: updatedUser });

    } catch(err) {
        console.error("Profile Update Error:", err);
        res.status(500).json({ error: "Server error during profile update." });
    }
});


module.exports = router;