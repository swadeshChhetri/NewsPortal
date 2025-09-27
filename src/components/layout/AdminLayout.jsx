import AdminNavbar from "../navigation/AdminNavbar";
import Sidebar from "../navigation/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="font-sans text-gray-800 flex">
      <AdminNavbar />
      
      {/* Sidebar only visible on medium+ screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content adjusts based on sidebar presence */}
      <main className="flex-1 md:ml-54 py-16">
        <div className="w-full p-4 space-y-5">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
