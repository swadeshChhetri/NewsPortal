import React from "react";
import { Home, FileText, Folder, Image, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth(); // use context logout

  const links = [
    { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { name: "Manage News", icon: FileText, path: "/admin/news" },
    { name: "Manage Categories", icon: Folder, path: "/admin/category" },
    { name: "Manage Media", icon: Image, path: "/admin/multimedia" },
  ];

  // Updated logout function
  const handleLogout = () => {
    logout(); // clear admin state from context + localStorage
    navigate("/admin/login"); // redirect to admin login page
  };

  return (
    <aside className="h-screen w-64 bg-gray-900 text-gray-100 fixed flex flex-col py-38">
      {/* Links */}
      <nav className="flex-1 px-4 space-y-6">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <link.icon className="w-5 h-5" />
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout at bottom */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button
          className="flex items-center gap-2 text-red-400 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
