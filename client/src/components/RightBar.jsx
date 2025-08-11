import React, { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import axios from "axios";

const RightBar = () => {
  const [data, setData] = useState([]);
  const [trendings, setTrendings] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/blogs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(response.data);
    console.log(response.data);
  };
  const getTrendings = () => {
    const freq = {};
    data.forEach((item) => {
      item.tags.forEach((tag) => {
        freq[tag] = (freq[tag] || 0) + 1;
      });
    });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    setTrendings(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      getTrendings();
    }
  }, [data]);

  return (
    <div className="bg-white shadow-lg rounded-xl border p-4 overflow-y-auto h-[450px]">
      <h1 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-500">
        <FaFire /> Trending Tags
      </h1>
      <div className="space-y-2">
        {trendings.map(([tag, count], index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition cursor-pointer"
          >
            <span className="capitalize">{tag}</span>
            <span className="text-sm font-semibold text-gray-600">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBar;
