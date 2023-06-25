const express = require("express");
const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const router = express.Router();

/* =============== ADD USER ==================== */

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, password, phoneNumber, email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const createdUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.json({ message: "create user failed" });
  }
});

/* =============== AUTH USER ==================== */

router.post("/signin", async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong Password" });

    return res.status(200).json({ user, message: "Authentication successful" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
