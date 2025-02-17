import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account, ID } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a1c369000c28cb062d");

const account = new Account(client);

function Signup() {
  const [name, setName] = useState(""); // ✅ Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // ✅ Include name in account creation
      await account.create(ID.unique(), email, password, name);

      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          required
        />

        <button type="submit" className="bg-green-500 text-white w-full py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
