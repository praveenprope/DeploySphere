// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DeploySphere from "./pages/DeploySphere";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* DeploySphere is now accessible to all users */}
        <Route path="/deploysphere" element={<DeploySphere />} />
      </Routes>
    </Router>
  );
}

export default App;
