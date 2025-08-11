import React, { useState } from "react";
import axios from "axios";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // ⬅️ Store selected image
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleBlogSubmit = async () => {
    if (!title || !content) {
      setErrorMsg("Title and content are required.");
      return;
    }
    if (!image) {
      setErrorMsg("Please select an image.");
      return;
    }

    try {
      setErrorMsg("");
      setMsg("");

      const token = localStorage.getItem("token");

      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tags", tags);
      formData.append("content", content);
      formData.append("image", image); // ⬅️ Image file

      await axios.post("http://localhost:3000/api/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg("✅ Blog created successfully!");
      setTitle("");
      setTags("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creating blog:", error.response || error.message);
      setErrorMsg(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to create blog."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto">
      {/* Left Side - Blog Info */}
      <div className="flex flex-col w-full md:w-1/2 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Blog
        </h2>

        {msg && <p className="text-green-500 text-sm">{msg}</p>}
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="Enter related tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-gray-300 p-3 rounded-lg"
        />

        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium transition"
          onClick={handleBlogSubmit}
        >
          Create Blog
        </button>
      </div>

      {/* Right Side - Blog Content */}
      <div className="w-full md:w-1/2">
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[400px] border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>
  );
};

export default CreateForm;
