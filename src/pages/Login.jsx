import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a1c369000c28cb062d");

const account = new Account(client);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        localStorage.setItem("userEmail", user.email);
        navigate("/deploysphere");
      } catch {
        console.log("No active session found");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/deploysphere");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await account.createRecovery(email, "http://localhost:5173/reset-password");
      alert("Password reset link sent to your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold text-gray-900 mb-6"
      >
        Welcome Back 👋
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

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          🔑 Login
        </button>

        <button 
          onClick={handleForgotPassword} 
          className="mt-3 text-blue-500 text-sm text-center block hover:underline"
        >
          Forgot Password?
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-gray-600 mt-2">
          <Link to="/" className="text-green-500 hover:underline">
            Back to Homepage
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
