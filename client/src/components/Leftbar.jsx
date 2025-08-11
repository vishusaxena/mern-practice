import React from "react";
import { FaBookmark, FaTags, FaUser } from "react-icons/fa";

const Leftbar = () => {
  const categories = [
    { name: "My Blogs", icon: <FaBookmark /> },
    { name: "Saved", icon: <FaBookmark /> },
    { name: "Categories", icon: <FaTags /> },
    { name: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="h-[450px] w-[250px] bg-white rounded-xl shadow-lg border p-4">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Menu</h2>
      <ul className="space-y-3">
        {categories.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            <span className="text-lg text-gray-600">{item.icon}</span>
            <span className="text-gray-700">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leftbar;
