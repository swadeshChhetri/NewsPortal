import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { Search, Bell, Menu, X, Home, FileText, Folder, Image, LogOut } from "lucide-react";

// 🔍 Search Input
const SearchBar = () => (
  <div className="relative hidden md:block">
    <input
      type="text"
      placeholder="Search"
      className="border rounded pl-9 pr-3 py-1 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
    />
    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
  </div>
);

// 🔔 Notification Bell
const NotificationBell = () => (
  <button className="relative hidden md:block">
    <Bell className="w-6 h-6 text-gray-600" />
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
      3
    </span>
  </button>
);

// 👤 Profile Section with dropdown
const ProfileSection = ({ admin, logout }) => {
  const [open, setOpen] = useState(false);

  if (admin) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-medium text-gray-700"
        >
          👋 Hi, {admin.name}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md py-1 z-50">
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to="/admin/login"
      className="text-sm font-medium text-yellow-600 hover:underline"
    >
      Login
    </Link>
  );
};

const links = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Manage News", icon: FileText, path: "/admin/news" },
  { name: "Manage Categories", icon: Folder, path: "/admin/category" },
  { name: "Manage Media", icon: Image, path: "/admin/multimedia" },
];

const AdminNavbar = () => {
  const { admin, logout } = useAdminAuth();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 📌 Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full bg-white border-b shadow-sm px-6 flex justify-between items-center transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="https://static.vecteezy.com/system/resources/previews/054/546/989/non_2x/news-globe-icon-design-vector.jpg"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Desktop Section */}
        <div className="hidden md:flex items-center gap-6">
          <SearchBar />
          <NotificationBell />
          <ProfileSection admin={admin} logout={logout} />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Mobile Popup Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 h-full bg-gray-900 text-gray-100 p-6 flex flex-col overflow-y-auto shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Links */}
            <nav className="mt-10 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-auto border-t border-gray-700 pt-4">
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
