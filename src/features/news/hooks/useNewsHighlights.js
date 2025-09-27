import { useEffect, useState } from "react";
import { NewsAPI } from "../../../services/api";
import toast from "react-hot-toast";

export const useNewsHighlights = () => {
  const [newsHighlights, setNewsHighlights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHighlights = async () => {
      setLoading(true);
      try {
        const data = await NewsAPI.fetchHighlights();
        let res = data.data.data
       
        setNewsHighlights(Array.isArray(res) ? res : []);
      } catch (err) {
        toast.error(err.message || "Failed to load highlights");
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return { newsHighlights, loading };
};
