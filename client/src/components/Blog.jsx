import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {data.map((p) => (
        <div
          key={p._id}
          className="bg-white border rounded-xl shadow-md p-5 hover:shadow-lg transition"
        >
          {/* Author Info */}
          {p.user && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                {p.user.name?.[0] || p.user.username?.[0] || "?"}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {p.user.name}
                </h3>
                <p className="text-xs text-gray-500">@{p.user.username}</p>
              </div>
            </div>
          )}

          {/* Blog Title */}
          <h1 className="text-2xl font-bold text-gray-800">{p.title}</h1>

          {/* Blog Image */}
          {p.imageUrl && (
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-full max-h-96 object-cover rounded-lg my-4"
            />
          )}

          {/* Blog Content */}
          <p className="my-3 text-gray-600">{p.body}</p>

          {/* Tags */}
          {p.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {p.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Reactions */}
          <div className="flex gap-6 text-sm text-gray-500">
            <span>👁 {p?.views || 0}</span>
            <span>👍 {p?.reactions?.likes || 0}</span>
            <span>👎 {p?.reactions?.dislikes || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
