// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DeploySphere from "./pages/DeploySphere";
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword Page

function App() {
  return (
    <Router basename="/DeploySphere"> {/* Set the base path */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/deploysphere" element={<DeploySphere />} />
        <Route path="/reset-password" element={<ResetPassword />} /> {/* Add Reset Password Route */}
      </Routes>
    </Router>
  );
}

export default App;
