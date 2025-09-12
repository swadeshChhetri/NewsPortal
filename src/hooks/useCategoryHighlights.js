import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CategoryAPI } from "../services/api";

export const useCategoryHighlights = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHighlights = async () => {
      setLoading(true);
      try {
        const data = await CategoryAPI.fetchHighlights();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error(err.message || "Failed to load category highlights");
      } finally {
        setLoading(false);
      }
    };

    loadHighlights();
  }, []);

  return { categories, loading };
};
