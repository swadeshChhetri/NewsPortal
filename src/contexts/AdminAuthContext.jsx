import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore from localStorage on first load
  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("adminToken");
 

      if (storedAdmin && storedAdmin !== "undefined") {
        setAdmin(JSON.parse(storedAdmin));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.error("Failed to parse admin/token from localStorage:", e);
    }finally {
      setLoading(false);
    }
  }, []);



  // ✅ Save both admin + token on login
  const login = (adminData, accessToken) => {
    setAdmin(adminData);
    setToken(accessToken);

    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", accessToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);

    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
