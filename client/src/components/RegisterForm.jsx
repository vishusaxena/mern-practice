import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    try {
      setErrorMsg("");
      const { data } = await axios.post("http://localhost:3000/api/register", {
        name,
        username,
        email,
        password,
      });
      setMsg(`Welcome ${data.user.name}!`);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      {msg && <p className="text-green-500 text-sm text-center mb-3">{msg}</p>}
      {errorMsg && (
        <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
      )}

      <label className="block mb-3">
        <span className="text-sm text-gray-600">Name</span>
        <input
          type="text"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm text-gray-600">Username</span>
        <input
          type="text"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm text-gray-600">Email</span>
        <input
          type="email"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleRegister}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
