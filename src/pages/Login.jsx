import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";

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
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const user = await account.get(); // Get user session
        localStorage.setItem("userEmail", user.email); // Store email in localStorage
        navigate("/deploysphere"); // Redirect if already logged in
      } catch (error) {
        console.log("No active session found");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(email, password);

      // Fetch user details
      const user = await account.get();
      console.log("User Info:", user);

      // Store user email in localStorage
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("isAuthenticated", "true");

      navigate("/deploysphere"); // Redirect after login
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          required
        />

        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
          Login
        </button>
      </form>

      <button onClick={handleForgotPassword} className="mt-4 text-blue-500">
        Forgot Password?
      </button>

      {/* Links for navigation */}
      <div className="mt-4 text-center">
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
      </div>
    </div>
  );
}

export default Login;
