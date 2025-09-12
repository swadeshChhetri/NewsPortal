import { useEffect, useState } from "react";
import NewsTable from "../../components/news/NewsTable";
import SpinnerLoader from "../../components/loaders/SpinnerLoader";
import NewsFormModal from "../../components/news/NewsFormModal";
import NewsFilters from "../../components/news/NewsFilter";
import { toast } from "react-hot-toast"; 
import { NewsAPI, CategoryAPI } from "../../services/api";
import AdminLayout from "../../components/AdminLayout/Layout";

export default function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [news, cats] = await Promise.all([
          NewsAPI.fetchAll(),
          CategoryAPI.fetchAll(),
        ]);
        setNewsList(news);
        setCategories(cats);
      } catch (e) {
        console.error("Failed to fetch", e);
        toast.error("Failed to load news data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

      // Append all form values
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      let response;
      if (id) {
        // For update with image support use POST + _method=PUT
        formData.append("_method", "PUT");
        response = await NewsAPI.update(id, formData);
        setNewsList(newsList.map((n) => (n.id === id ? response : n)));
        toast.success("News updated successfully ✨");
      } else {
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
        toast.error("Failed to save news ❌");
      }
    }
  };

  const filteredNews = newsList.filter((item) => {
    const matchesSearch = item.title
      ? item.title.toLowerCase().includes(search.toLowerCase())
      : false;

    const matchesCategory =
      filterCategory === "All" || item.categories?.name === filterCategory;

    const matchesStatus =
      filterStatus === "All" ||
      (item.status && item.status.toLowerCase() === filterStatus.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus;
  });

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
      <NewsFilters
        {...{
          search,
          setSearch,
          filterCategory,
          setFilterCategory,
          filterStatus,
          setFilterStatus,
          categories,
        }}
      />
      <NewsTable
        news={filteredNews}
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
      />
    </AdminLayout>
  );
}
