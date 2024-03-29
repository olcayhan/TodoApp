const express = require("express");
const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authenticateToken = require("../middleware/authenticateToken.js");
/* =============== ADD USER ==================== */

router.post("/register", async (req, res) => {
  try {
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
    return res.json({ message: "create user failed" });
  }
});

/* =============== AUTH USER ==================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    return res.status(201).json(user);
  } catch (err) {
    return res.json({ message: "user failed" });
  }
});

module.exports = router;
