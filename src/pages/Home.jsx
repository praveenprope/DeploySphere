// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to DeploySphere</h1>
      <p className="mb-6">Showcase all your deployed projects in one place</p>
      <div>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Login
        </Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Sign Up
        </Link>
        <Link to="/deploysphere" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Go to DeploySphere
        </Link>
      </div>
    </div>
  );
}

export default Home;
