import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewsAPI } from "../../../services/api";

export const useNewsHighlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHighlights = async () => {
      setLoading(true);
      try {
        const data = await NewsAPI.fetchHighlights();
        setHighlights(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error(err.message || "Failed to load highlights");
      } finally {
        setLoading(false);
      }
    };

    loadHighlights();
  }, []);

  return { highlights, loading };
};
