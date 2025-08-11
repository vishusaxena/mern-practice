const express = require("express");
const router = express.Router();
const protected = require("../middlewares/authMiddleware");
const {
  handleRegister,
  handleLogin,
  handleUserProfile,
  handleGetAllBlogs,
} = require("../controllers/authController");

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/me", protected, handleUserProfile);
router.get("/my-blogs", protected, handleGetAllBlogs);

module.exports = router;
