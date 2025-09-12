import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewsAPI } from "../services/api";

export const useDashboardData = () => {
  const [newsData, setNewsData] = useState([]);
  const [stats, setStats] = useState({
    totalNews: 0,
    published: 0,
    drafts: 0,
    categories: 0,
    comments: 0,
  });
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await NewsAPI.fetchAll();


        setNewsData(data);

        // Calculate stats
        const totalNews = data.length;
        const published = data.filter((n) => n.status === "published").length;
        const drafts = data.filter((n) => n.status === "draft").length;
        const categories = new Set(data.map((n) => n.category?.id)).size;
        const comments = data.reduce((acc, n) => acc + (n.comments?.length || 0), 0);

        setStats({ totalNews, published, drafts, categories, comments });

        // Recent comments
        const allComments = data.flatMap((n) =>
          (n.comments || []).map((c) => ({
            id: c.id,
            user: c.user?.name || "Anonymous",
            comment: c.comment,
            date: c.created_at,
          }))
        );

        setRecentComments(
          allComments
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
        );
      } catch (err) {
        toast.error(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { newsData, stats, recentComments, loading };
};


