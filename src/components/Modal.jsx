import React, { useState } from "react";
import { Client, Databases, ID, Account } from "appwrite";
import { toast } from "react-hot-toast";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a1c369000c28cb062d");

const databases = new Databases(client);
const account = new Account(client);

function Modal({ isOpen, onClose }) {
  const [projectTitle, setProjectTitle] = useState("");
  const [userLink, setUserLink] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!projectTitle.trim() || !userLink.trim()) {
      toast.error("⚠️ Please enter both project title and deploy link!");
      return;
    }

    setLoading(true);
    try {
      const user = await account.get();
      await databases.createDocument(
        "67a6f9e5003dd8a85631",
        "67b036be001d9e542d53",
        ID.unique(),
        {
          email: user.email,
          projectTitle: projectTitle.trim(),
          userLink: userLink.trim(),
        }
      );

      toast.success("🚀 Project added successfully!");
      
      setTimeout(() => {
        window.location.reload(); // ✅ Auto refresh after success
      }, 100);

    } catch (error) {
      toast.error(`❌ Failed to save: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 border border-blue-100">
        <h2 className="text-2xl font-bold text-cyan-600 mb-4 text-center">➕ Add Project</h2>
        
        <input
          type="text"
          placeholder="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          className="w-full p-3 mb-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="text"
          placeholder="Deploy Link"
          value={userLink}
          onChange={(e) => setUserLink(e.target.value)}
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all"
          >
            ❌ Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-xl transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
            }`}
          >
            {loading ? "Saving..." : "💾 Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
