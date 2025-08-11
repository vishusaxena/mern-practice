import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import axios from "axios";

const Dashboard = () => {
  const { user, loading } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/my-blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-5 space-y-8">
      {/* Welcome Banner */}
      <div className="mx-2 bg-gradient-to-r from-sky-500 to-blue-600 h-[200px] p-5 text-white flex items-center justify-center rounded-lg shadow-lg">
        <div className="text-3xl md:text-5xl font-bold">
          Welcome, {user?.username || "Guest"}
        </div>
      </div>

      {/* Blog List */}
      {blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.body}
              </p>
              <div className="text-sm text-blue-500 font-medium">
                {Array.isArray(blog.tags)
                  ? blog.tags.map((tag) => tag.replace(/^#/, "")).join(", ")
                  : blog.tags.replace(/#/g, "")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-medium">
          No blogs found. Start writing one!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
