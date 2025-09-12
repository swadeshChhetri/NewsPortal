import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="font-sans text-gray-800 flex">
      <AdminNavbar />
      
      {/* Sidebar only visible on medium+ screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content adjusts based on sidebar presence */}
      <main className="flex-1 md:ml-64 py-24">
        <div className="w-full p-6 space-y-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
