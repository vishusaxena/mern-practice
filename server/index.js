require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const app = express();
const PORT = 3000;

const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

// Adjust path if needed
const { mongoose } = require("mongoose");

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
