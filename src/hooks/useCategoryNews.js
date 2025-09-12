import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CategoryAPI } from "../services/api";

export const useCategoryNews = (slug) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadCategoryNews = async () => {
      setLoading(true);
      try {
        const data = await CategoryAPI.fetchNews(slug);
        setCategory(data.category || "");
        setNews(Array.isArray(data.news) ? data.news : []);
      } catch (err) {
        toast.error(err.message || "Failed to load category news");
      } finally {
        setLoading(false);
      }
    };

    loadCategoryNews();
  }, [slug]);

  return { news, category, loading };
};
