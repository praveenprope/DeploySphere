<div className="bg-[#264653]">
<div className="flex flex-col max-w-7xl mx-auto min-h-screen bg-[#264653] text-white p-6">
<h1 className="text-3xl font-bold self-start ">{username || "User"}</h1>
<div className="w-[80vw] h-[60vh] bg-[#ffcc00] border-4 border-black p-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)]">
<div className="flex w-full justify-around items-center bg-[#ff3300] border-b-4 border-black h-1/2 text-2xl font-bold">
<div className="w-60 h-full flex flex-col justify-center items-center px-4 py-2 border-2 border-black bg-white text-black shadow-[6px_6px_0px_black] rounded-lg">
  <p className="text-lg font-semibold">{dateTime.toLocaleDateString()}</p>
  <p className="text-xl font-bold mt-2">{dateTime.toLocaleTimeString()}</p>
</div>
<button
  onClick={() => setIsModalOpen(true)}
  className="px-4 py-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_black]"
>
  Add Project
</button>
<div className="px-4 py-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_black]">Profile</div>
<div className="px-4 py-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_black]">Theme</div>
<div>
  {isAuthenticated ? (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-[#ff0000] text-white border-2 border-black shadow-[4px_4px_0px_black] hover:bg-[#cc0000]"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="px-6 py-2 bg-[#00cc00] text-white border-2 border-black shadow-[4px_4px_0px_black] hover:bg-[#009900]"
    >
      Login
    </button>
  )}
</div>
</div>
<div className="flex flex-wrap justify-center bg-[#00ccff] border-t-4 border-black h-1/2 text-2xl font-bold p-4 overflow-y-auto">
{projects.length > 0 ? (
  projects.map((project, i) => (
    <a
      key={i}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="m-2 px-4 py-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_black] cursor-pointer"
    >
      {project.name}
    </a>
  ))
) : (
  <p className="text-black">No projects added</p>
)}
</div>
</div>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveProject} />
</div>
</div>