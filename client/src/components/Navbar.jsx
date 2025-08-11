import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action === "profile") {
      navigate("/me");
    } else if (action === "logout") {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/auth");
    }
  };

  return (
    <header className="bg-[#23395B] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-gray-200 transition"
        >
          Knowtopia
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#1e2f47] rounded-lg overflow-hidden w-[40%]">
          <input
            type="text"
            placeholder="Search Blog..."
            className="px-3 py-2 w-full bg-transparent text-white focus:outline-none"
          />
          <FaSearch className="mx-3 text-gray-300" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user && (
            <Link
              to="/create"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white text-sm font-medium transition"
            >
              <FaPlus /> Create
            </Link>
          )}

          {user ? (
            <select
              defaultValue=""
              onChange={(e) => handleAction(e.target.value)}
              className="bg-[#23395B] border border-gray-500 rounded-lg px-2 py-1 text-sm"
            >
              <option value="" disabled>
                <div className="flex items-center gap-2">
                  <FaUserCircle /> {user.username}
                </div>
              </option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          ) : (
            <Link
              to="/auth"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
