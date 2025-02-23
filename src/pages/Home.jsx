import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Animated Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-5xl font-extrabold text-gray-900 mb-4"
      >
        Welcome to <span className="text-blue-600">DeploySphere 🚀</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }} 
        className="text-lg text-gray-700 mb-8"
      >
        Showcase all your deployed projects in one place.
      </motion.p>

      {/* Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3 }}
        className="flex space-x-4"
      >
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          🔑 Login
        </Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
          ✨ Sign Up
        </Link>
        <Link to="/deploysphere" className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition">
          🚀 Go to DeploySphere
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
