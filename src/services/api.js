// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Create axios instance
const API = axios.create({
  baseURL: API_URL,
});

// Attach token automatically if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- News APIs ----------------
export const NewsAPI = {
  fetchHighlights: () => API.get("/news-highlights"),
  fetchLatest: () => API.get("/news"),
  fetchByCategory: (slug) => API.get(`/category/${slug}`),
  fetchCategoryHighlights: () => API.get("/category-highlights"),
  search: (query) => API.get(`/search?q=${query}`),
  fetchById: async (id) => (await API.get(`/news/${id}`)).data,
  postComment: async (newsId, commentText) =>
    (await API.post(`/news/${newsId}/comments`, { comment: commentText })).data,

  // Admin Dashboard
  fetchAll: async () => (await API.get("/news")).data,
  create: async (data) =>
    (await API.post("/news", data, { headers: { "Content-Type": "multipart/form-data" } })).data.news ?? (await API.post("/news", data)).data,
  update: async (id, data) =>
    (await API.post(`/news/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data,
  delete: async (id) => (await API.delete(`/news/${id}`)).data,
};

// ---------------- Category APIs ----------------
export const CategoryAPI = {
  fetchAll: async () => (await API.get("/categories")).data,
  fetchHighlights: async () => (await API.get("/category-highlights")).data,
  fetchNews: async (slug) => (await API.get(`/category/${slug}`)).data,
  create: async (data) => (await API.post("/categories", data)).data,
  update: async (id, data) => (await API.put(`/categories/${id}`, data)).data,
  delete: async (id) => (await API.delete(`/categories/${id}`)).data,
};

// ---------------- Auth APIs ----------------
export const AdminAuthAPI = {
  login: async (formData) => (await API.post("/admin/login", formData)).data,
  register: async (formData) =>
    (await API.post("/admin/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
    })).data,
};

export const UserAuthAPI = {
  login: async (formData) => (await API.post("/login", formData)).data,
  register: async (formData) =>
    (await API.post("/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
    })).data,
};

// ---------------- Newsletter ----------------
export const NewsletterAPI = {
  subscribe: async (email) => (await API.post("/subscribe", { email })).data,
};

// ---------------- Multimedia APIs ----------------
export const MultimediaAPI = {
  fetchAll: async () => (await API.get("/multimedia")).data,
  create: async (data) =>
    (await API.post("/multimedia", data, { headers: { "Content-Type": "multipart/form-data" } })).data,
  update: async (id, data) =>
    (await API.post(`/multimedia/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data,
  delete: async (id) => (await API.delete(`/multimedia/${id}`)).data,
};

export default API;
