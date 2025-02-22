import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Client, Account, Databases, ID, Query } from "appwrite";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a1c369000c28cb062d");

const account = new Account(client);
const databases = new Databases(client);

function DeploySphere() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Get URL query parameters

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        setIsAuthenticated(true);
        setUsername(user.name);
        setUserId(user.$id);
        setUserEmail(user.email);

        // Save userId, userEmail, and username in localStorage
        localStorage.setItem("userId", user.$id);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("username", user.name);

        // Fetch projects for the logged-in user
        fetchProjects(user.$id);
      } catch (error) {
        setIsAuthenticated(false);

        // If not authenticated, check if a shared userId is provided in the URL
        const sharedUserId = searchParams.get("userId");
        if (sharedUserId) {
          fetchProjects(sharedUserId); // Fetch projects for the shared userId
        } else {
          setProjects([]); // Clear projects if no shared userId
        }
      }
    };
    checkSession();
  }, [searchParams]);

  const fetchProjects = async (userId) => {
    if (!userId) {
      setProjects([]); // If no userId, clear projects
      return;
    }

    try {
      const response = await databases.listDocuments(
        "67a6f9e5003dd8a85631", // Database ID
        "67b036be001d9e542d53", // Collection ID
        [Query.equal("userId", userId)] // Fetch projects for the given userId
      );

      setProjects(
        response.documents.map((doc) => ({
          id: doc.$id,
          name: doc.projectTitle,
          link: doc.userLink,
        }))
      );
    } catch (error) {
      console.error("🚨 Error fetching projects:", error);
      toast.error("❌ Cannot fetch projects. Check database permissions.");
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("❌ Logout failed!");
    }
  };

  const handleSaveProject = async () => {
    if (!isAuthenticated) {
      toast.error("🚨 Please log in to add a project!");
      return;
    }

    if (!projectName.trim() || !deployLink.trim()) return;

    try {
      const response = await databases.createDocument(
        "67a6f9e5003dd8a85631",
        "67b036be001d9e542d53",
        ID.unique(),
        {
          userId, // Store userId for project ownership
          email: userEmail, // Keep email for additional reference
          projectTitle: projectName,
          userLink: deployLink,
          username,
        }
      );

      setProjects((prevProjects) => [
        ...prevProjects,
        { id: response.$id, name: projectName, link: deployLink },
      ]);

      setIsModalOpen(false);
      toast.success("🚀 Project added successfully!");
    } catch (error) {
      console.error("🚨 Error saving project:", error);
      toast.error("❌ Failed to add project. Please try again.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!isAuthenticated) {
      toast.error("🚨 You must log in to delete projects!");
      return;
    }

    if (!projectId) {
      console.error("🚨 Error: Missing project ID");
      return;
    }

    try {
      await databases.deleteDocument(
        "67a6f9e5003dd8a85631",
        "67b036be001d9e542d53",
        projectId
      );
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );

      toast.success("🗑️ Project deleted successfully!");
    } catch (error) {
      console.error("🚨 Error deleting project:", error);
    }
  };

  const shareLink = `${window.location.origin}/DeploySphere/deploysphere?userId=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("📋 Link copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full py-10 px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-10 flex-wrap gap-4">
          <h1 className="text-5xl font-extrabold text-cyan-700 drop-shadow-lg">
            Welcome {username || "User"} 👋
          </h1>
          {isAuthenticated && (
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Share your projects:</p>
              <span className="text-blue-700 font-semibold truncate">{shareLink}</span>
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
              >
                📋 Copy
              </button>
            </div>
          )}
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-5 mb-10 shadow-2xl border border-blue-200">
          <div className="flex flex-wrap gap-4">
            <button className="nav-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:to-blue-400 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all">
              👤 Profile
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="nav-btn bg-gradient-to-r from-purple-600 to-purple-500 hover:to-purple-400 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
              >
                ➕ Add Project
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="nav-btn bg-gradient-to-r from-red-600 to-red-500 hover:to-red-400 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
              >
                🔒 Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="nav-btn bg-gradient-to-r from-green-600 to-green-500 hover:to-green-400 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
              >
                🔑 Login
              </button>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-700 mb-8 ml-2 drop-shadow-md">
            {isAuthenticated ? "Your Projects 🚀" : "Shared Projects 🚀"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card bg-white rounded-2xl p-6 border border-blue-200 shadow-lg"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-2xl font-bold text-blue-800 mb-3 truncate">
                      {project.name}
                    </h3>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-blue-700 font-semibold text-lg">
                No projects found!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Adding Project */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default DeploySphere;