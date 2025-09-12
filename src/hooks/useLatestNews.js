import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewsAPI } from "../services/api";

export const useLatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await NewsAPI.fetchLatest();
        setLatestNews(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        toast.error(err.message || "Failed to load latest news");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { latestNews, loading };
};
