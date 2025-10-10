// routes/profile.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update user profile
router.put("/update/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({ message: "Profile updated successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error!" });
  }
});

module.exports = router;
