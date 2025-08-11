import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import UserProvider from "./context/contextProvider";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/me" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
