// controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const blog = require("../models/blogModel");

const handleRegister = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Validate required fields
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error); // <-- log error for debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Compare password
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET, // Must be set in your .env
      { expiresIn: "1h" } // Token expiry
    );

    // Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleUserProfile = (req, res) => {
  res.json({ user: req.user });
};

const handleGetAllBlogs = async (req, res) => {
  const blogs = await blog.find({ user: req.user.id }).sort({ createdAt: -1 });

  return res.status(200).json(blogs);
};
module.exports = {
  handleRegister,
  handleLogin,
  handleUserProfile,
  handleGetAllBlogs,
};
