const express = require("express");
const router = express.Router();
const { handleBlogCreation } = require("../controllers/blogController");
const protected = require("../middlewares/authMiddleware");
const { handleGetBlogs } = require("../controllers/blogController");
const upload = require("../utils/fileupload");

router.post("/create", protected, upload.single("image"), handleBlogCreation);
router.get("/blogs", handleGetBlogs);

module.exports = router;
