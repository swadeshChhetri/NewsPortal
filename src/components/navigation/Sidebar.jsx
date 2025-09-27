import React, { useState } from "react";
import {
  Home,
  FileText,
  Folder,
  Image,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [openMenu, setOpenMenu] = useState(null);

  const links = [
    { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
    {
      name: "News",
      icon: FileText,
      children: [
        { name: "Manage News", path: "/admin/news" },
        { name: "Add Post", path: "/admin/addpost" },
        { name: "All Posts", path: "/admin/news/all" },
      ],
    },
    { name: "Manage Categories", icon: Folder, path: "/admin/category" },
    // { name: "Manage Media", icon: Image, path: "/admin/multimedia" },
    { name: "Manage User", icon: Image, path: "/admin/user-management" },
  ];

  // Updated logout function
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside className="h-screen w-54 bg-gray-900 text-gray-100 fixed flex flex-col py-28">
      {/* Links */}
      <nav className="flex-1 space-y-4">
        {links.map((link) =>
          link.children ? (
            <div key={link.name}>
              {/* Parent with toggle */}
              <button
                onClick={() => toggleMenu(link.name)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                <span className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </span>
                {openMenu === link.name ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Sub-links */}
              {openMenu === link.name && (
                <div className="ml-8 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className="block px-3 py-1 rounded-md text-sm hover:bg-gray-700"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          )
        )}
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
