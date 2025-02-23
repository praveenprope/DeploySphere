import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account, ID } from "appwrite";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a1c369000c28cb062d");

const account = new Account(client);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match!");
      return;
    }

    try {
      await account.create(ID.unique(), email, password, name);
      alert("🎉 Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-100">
      {/* Animated Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold text-gray-900 mb-6"
      >
        Create an Account 🚀
      </motion.h2>

      <motion.form 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <div className="mb-4 flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        <div className="mb-4 flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        <div className="mb-4 flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        <div className="mb-4 flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <FaCheck className="text-gray-500 mr-3" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          ✅ Sign Up
        </button>
      </motion.form>

      {/* Links for navigation */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-gray-600">
          Already have an account?{" "}
          <a href="/DeploySphere/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
        <p className="text-gray-600 mt-2">
          <a href="/" className="text-blue-500 hover:underline">
            Back to  Homepage
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
