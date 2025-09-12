import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navLinks = [
    { name: "News", slug: "news" },
    { name: "Life", slug: "life" },
    { name: "Tech", slug: "tech" },
    { name: "Travel", slug: "travel" },
    { name: "Money", slug: "money" },
    { name: "Sports", slug: "sports" },
    { name: "Entertainment", slug: "entertainment" },
  ];

  const navigate = useNavigate();

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < lastScrollY || window.scrollY < 10);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 border-b bg-white shadow-sm transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <Link to="/" className="w-20 h-16 rounded-full overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/054/546/989/non_2x/news-globe-icon-design-vector.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Desktop Search + Profile */}
          <div className="hidden md:flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </form>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-yellow-600"
                >
                  👋 Hi, {user.name} <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-yellow-500 text-white font-medium text-sm shadow-md hover:bg-yellow-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:block border-t bg-white">
          <ul className="flex justify-center space-x-6 py-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={`/category/${link.slug}`}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 h-full bg-white shadow-lg p-6 flex flex-col overflow-y-auto transform transition-transform duration-300">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-2 right-4 text-gray-700 hover:text-black mb-4"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className=" mt-4 relative mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news..."
                className="border rounded-full pl-10 pr-4 py-2 w-full text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </form>

            {/* Links */}
            <nav className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={`/category/${link.slug}`}
                  className="text-gray-700 hover:text-yellow-600 font-medium px-3 py-2 rounded-lg transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Login / Profile */}
            <div className="mt-auto pt-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full py-2 rounded-full bg-yellow-500 text-white font-medium hover:bg-yellow-600 block text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
