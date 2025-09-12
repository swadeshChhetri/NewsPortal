import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./features/auth/LoginPage";
import SingleNewsPage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import CategoriesManagement from "./features/admin/ManageCategory";
import AdminNavbar from "./features/admin/Dashboard";
import ManageNews from "./features/admin/ManageNews";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLoginPage from "./features/auth/LoginPage";
import AdminRegisterPage from "./features/auth/AdminRegister";
import MultimediaPage from "./features/admin/ManageMultiMedia";
import ProtectedAdminRoute from "./components/AdminLayout/ProtectedAdminRoute";
import NotFound from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path="/category/:categoryName" element={<CategoryPage />} /> */}
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/news/:id" element={<SingleNewsPage />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Admin Routes */}
          {/* Admin Auth Routes (no protection) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminNavbar />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedAdminRoute>
                <ManageNews />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <ProtectedAdminRoute>
                <CategoriesManagement />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/multimedia"
            element={
              <ProtectedAdminRoute>
                <MultimediaPage />
              </ProtectedAdminRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
