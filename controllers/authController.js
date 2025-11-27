const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user"       
      });

      return res.status(201).json({
        message: "Registration successful",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }
      });
  } 
  catch (error) {
      console.error("REGISTER ERROR:", error);
      return res.status(500).json({ message: "Server error", error });
  }
};



exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email & Password required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
  } 
  catch (error) {
      console.error("LOGIN ERROR:", error);
      return res.status(500).json({ message: "Server error", error });
  }
};
