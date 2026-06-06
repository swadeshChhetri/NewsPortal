// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Create axios instance
const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- News APIs ----------------
export const NewsAPI = {
  fetchLatest: () => API.get("/news"),
  fetchHighlights: () => API.get("/news/getHighlightNewsWithCategory"),
  // fetchByCategory: (slug) => API.get(`/admin/category/${slug}`),
  // fetchCategoryHighlights: () => API.get("/category-highlights"),
  search: (query) => API.get(`/search?q=${query}`),
  fetchById: async (id) => (await API.get(`/news/${id}`)).data,
  postComment: async (newsId, commentText) =>
    (await API.post(`/news/${newsId}/comments`, { comment: commentText })).data,

  // Admin Dashboard
  fetchAll: async () => {
    const res = await API.get("/admin/news");
    return res.data;
  },

  create: async (data) => {
    const response = await API.post("/admin/news", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  update: async (id, data) =>
    (
      await API.post(`/admin/news/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  delete: async (id) => (await API.delete(`/admin/news/${id}`)).data,
};

// ---------------- Category APIs ----------------
export const CategoryAPI = {
  fetchNews: async (slug) => (await API.get(`/category/slug/${slug}`)).data,
  // fetchHighlights: async () => (await API.get("/category/highlights")).data,

  fetchAll: async () => (await API.get("/admin/categories")).data,
  create: async (data) => (await API.post("/admin/categories", data)).data,
  update: async (id, data) =>
    (await API.put(`/admin/categories/${id}`, data)).data,
  delete: async (id) => (await API.delete(`/admin/categories/${id}`)).data,
};

// ---------------- Auth APIs ----------------
export const AdminAuthAPI = {
  login: async (formData) => (await API.post("/admin/login", formData)).data,
  register: async (formData) =>
    (
      await API.post("/admin/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      })
    ).data,
};

export const UserAuthAPI = {
  login: async (formData) => (await API.post("/users/login", formData)).data,
  register: async (formData) =>
    (
      await API.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
      })
    ).data,
};

export const UserAPI = {
  fetchAll: async () => (await API.get("/admin/users")).data,
  fetchById: async (id) => (await API.get(`/admin/users/${id}`)).data,
  update: async (id, data) => (await API.put(`/admin/users/${id}`, data)).data,
  delete: async (id) => (await API.delete(`/admin/users/${id}`)).data, // new
};

// ---------------- Comments APIs ----------------
export const CommentAPI = {
  fetchLatest: async () => {
    const res = await API.get("/admin/comments/latest");
    return res.data; // assuming your backend returns { success: true, comments: [...] }
  },
};

// ---------------- Newsletter ----------------
export const NewsletterAPI = {
  subscribe: async (email) =>
    (await API.post("/newsletter/subscribe", { email })).data,
};

// ---------------- Multimedia APIs ----------------
export const MultimediaAPI = {
  fetchAll: async () => (await API.get("/multimedia")).data,
  create: async (data) =>
    (
      await API.post("/multimedia", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  update: async (id, data) =>
    (
      await API.post(`/multimedia/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  delete: async (id) => (await API.delete(`/multimedia/${id}`)).data,
};

export default API;
