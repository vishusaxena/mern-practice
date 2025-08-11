const blog = require("../models/blogModel");

const handleBlogCreation = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("Cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);

    const { title, tags, content } = req.body;

    if (!title || !tags || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const searchTitle = await blog.findOne({ title });
    if (searchTitle) {
      return res.status(400).json({ message: "Title is already taken" });
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Image upload (Cloudinary URL will be in req.file.path)
    const imageUrl = req.file ? req.file.path : null;

    const newBlog = await blog.create({
      title,
      body: content,
      tags: tagsArray,
      user: req.user.id,
      imageUrl, // save Cloudinary image URL
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Server error details:", error); // full stack trace
    res.status(500).json({
      message: "Server Error",
      error: error.message || error.toString(),
    });
  }
};

const handleGetBlogs = async (req, res) => {
  try {
    const blogs = await blog
      .find()
      .populate("user", "name username email") // populate user details
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching blogs" });
  }
};

module.exports = { handleBlogCreation, handleGetBlogs };
