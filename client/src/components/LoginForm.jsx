import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      setErrorMsg("");
      const { data } = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user); // store entire user object
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {errorMsg && (
        <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
      )}

      <label className="block mb-3">
        <span className="text-sm text-gray-600">Username</span>
        <input
          type="text"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm text-gray-600">Password</span>
        <input
          type="password"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
