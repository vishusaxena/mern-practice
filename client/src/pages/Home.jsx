import React from "react";
import RightBar from "../components/RightBar";
import Leftbar from "../components/Leftbar";
import Blog from "../components/Blog";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="flex justify-between gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[250px]">
          <Leftbar />
        </div>

        {/* Blog Content */}
        <div className="flex-1">
          <Blog />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-[300px]">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
