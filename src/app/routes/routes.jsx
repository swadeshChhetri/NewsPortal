import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Home from './../../pages/HomePage';
import Login from './../../features/auth/pages/Login';
import Signup from "./../../features/auth/pages/Signup";
import CategoryPage from "./../../features/news/pages/CategoryPage";
import SingleNewsPage from "./../../features/news/pages/ArticlePage";
import SearchResults from "./../../features/search/pages/SearchResults";
import NotFound from "../../pages/NotFoundPage";

// Auth
import AdminLoginPage from "./../../features/auth/pages/AdminLoginPage";
import AdminRegisterPage from "./../../features/auth/pages/AdminRegister";

// Admin
import Dashboard from "./../../features/admin/pages/Dashboard";
import ManageNews from "./../../features/admin/pages/ManageNews";
import CategoriesManagement from "./../../features/admin/pages/ManageCategory";
import MultimediaPage from "./../../features/admin/pages/ManageMultiMedia";
import AddNewPost from "./../../features/admin/components/AddNewPost"; 

// Protected
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ManageUser from "../../features/admin/pages/ManageUser";
import UserForm from "../../features/admin/components/UserForm";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/news/:id" element={<SingleNewsPage />} />
      <Route path="/search" element={<SearchResults />} />

      {/* Admin Auth (no protection) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />
      <Route path="/admin/addpost" element={<AddNewPost />} />
      <Route path="/admin/user-management" element={<ManageUser />} />
      <Route path="/admin/user-management/create" element={<UserForm />} />
      <Route path="/admin/user-management/edit/:id" element={<UserForm />} />

      {/* Protected Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <Dashboard />
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
  );
}
