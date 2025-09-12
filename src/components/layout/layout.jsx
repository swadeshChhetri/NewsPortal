// src/components/layout/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
