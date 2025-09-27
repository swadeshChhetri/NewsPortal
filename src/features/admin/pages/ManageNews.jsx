import { useEffect, useState } from "react";
// import NewsTable from "../../components/news/NewsTable";
import NewsTable from "./../../news/components/NewsTable";

import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import NewsFormModal from "./../../news/components/NewsFormModal";
import NewsFilters from "./../../news/components/NewsFilter";
import { toast } from "react-hot-toast";
import { NewsAPI, CategoryAPI } from "../../../services/api";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // replace spaces with dashes
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [news, cats] = await Promise.all([
          NewsAPI.fetchAll(),
          CategoryAPI.fetchAll(),
        ]);
        setNewsList(news.news);
        setCategories(cats.categories);
      } catch (e) {
        console.error("Failed to fetch", e);
        toast.error("Failed to load news data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNewsAdded = () => {
    setRefresh((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await NewsAPI.delete(id);
      setNewsList(newsList.filter((n) => n.id !== id));
      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Failed to delete", error);
      toast.error("Failed to delete news");
    }
  };

  const handleSubmit = async (form, id) => {
    try {
      const formData = new FormData();

      // Always regenerate slug from title unless user manually changed slug
      const finalSlug = form.slug?.trim()
        ? generateSlug(form.slug)
        : generateSlug(form.title);

      // Prepare cleaned payload
      const payload = {
        ...form,
        slug: finalSlug,
        category_id: form.category_id?._id || form.category_id,
        is_highlight: Boolean(form.is_highlight),
      };

      // Append all safe values
      Object.entries(payload).forEach(([key, value]) => {

        if (value === null || value === undefined || value === "") return;

        // only append image if it's a File
        if (key === "image" && !(value instanceof File)) return;

        // convert boolean to string for FormData
        if (typeof value === "boolean") value = value.toString();

        formData.append(key, value);
      });

      // Ensure is_highlight always exists
      if (!("is_highlight" in payload)) {
        formData.append("is_highlight", "false");
      }

      let response;
      if (id) {
        // Update news → use method override
        formData.append("_method", "PUT");
        response = await NewsAPI.update(id, formData);

        setNewsList(newsList.map((n) => (n.id === id ? response : n)));
        toast.success("News updated successfully ✨");
      } else {
        // Create new news
        response = await NewsAPI.create(formData);
        setNewsList([response, ...newsList]);
        toast.success("News created successfully 🎉");
      }

      setIsOpen(false);
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
        toast.error("Validation failed ❌");
      } else {
        console.error("Failed to save news", error);
        toast.error(error.response.data.message || "Failed to save");
      }
    }
  };

  // const filteredNews = newsList.filter((item) => {
  //   const matchesSearch = item.title
  //     ? item.title.toLowerCase().includes(search.toLowerCase())
  //     : false;

  //   const matchesCategory =
  //     filterCategory === "All" || item.categories?.name === filterCategory;

  //   const matchesStatus =
  //     filterStatus === "All" ||
  //     (item.status && item.status.toLowerCase() === filterStatus.toLowerCase());

  //   return matchesSearch && matchesCategory && matchesStatus;
  // });

  if (loading) {
    return <SpinnerLoader size={60} color="yellow-500" />;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Management</h1>
        <button
          onClick={() => {
            setEditingNews(null);
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Add News
        </button>
      </div>
      {/* <NewsFilters
        {...{
          search,
          setSearch,
          filterCategory,
          setFilterCategory,
          filterStatus,
          setFilterStatus,
          // categories,
        }}
      /> */}
      <NewsTable
        news={newsList}
        onEdit={(n) => {
          setEditingNews(n);
          setIsOpen(true);
        }}
        onDelete={handleDelete}
      />
      <NewsFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        editingNews={editingNews}
        categories={categories}
        onNewsAdded={handleNewsAdded}
      />
    </AdminLayout>
  );
}
